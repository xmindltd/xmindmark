import JSZip from 'jszip'
import { BoundaryModel, SheetModel, SummaryModel, TopicModel } from '../types'

export type XMindMarkContent = string

async function tryExtractContentJSON(file: ArrayBuffer): Promise<SheetModel[] | null> {
  try {
    const zip = await new JSZip().loadAsync(file)
    const contentJSON = await zip.file('content.json')?.async('string')

    return JSON.parse(contentJSON ?? '') as SheetModel[]
  } catch (e) {
    console.error('Not valid .xmind file.')
    return null
  }
}

type LayerScopeContext = {
  readonly layer: number
  readonly boundaries?: BoundaryModel[]
  readonly summaries?: SummaryModel[]
  boundaryIdentifier: number
  summaryIdentifier: number
}
type TopicScopeContext = LayerScopeContext & {
  readonly labels: string[]
  readonly title: string
}
type TopicContextObserver = (ctx: TopicScopeContext) => void

function traverseTopics(topic: TopicModel, topicObserver: TopicContextObserver, scopeContext?: LayerScopeContext) {
  const defaultScopeContext: LayerScopeContext = {
    layer: 0,
    boundaries: topic.boundaries,
    summaries: topic.summaries,
    boundaryIdentifier: 1,
    summaryIdentifier: 1
  }
  const context: TopicScopeContext = {
    labels: topic.labels ?? [],
    title: topic.title,
    ...(scopeContext ?? defaultScopeContext)
  }
  topicObserver(context)

  const currentScopeContext: LayerScopeContext = {
    layer: scopeContext?.layer ? scopeContext.layer + 1 : 1,
    boundaries: topic.boundaries,
    summaries: topic.summaries,
    boundaryIdentifier: 1,
    summaryIdentifier: 1
  }
  topic.children?.attached?.forEach(child => traverseTopics(child, topicObserver, currentScopeContext))
}

function xmindMarkFrom(sheet: SheetModel): XMindMarkContent {
  const lines: string[] = []
  const root = sheet.rootTopic
  const topicObserver: TopicContextObserver = ({ labels, title, layer }) => {
    const indent = Array.from({ length: layer }).reduce<string>(prevIndent => prevIndent.concat('    '), '')
    const prefix = layer > 0 ? '- ' : ''
    const label = labels.length > 0 ? `[${labels.map(v => v.trim()).join(', ')}] ` : ''
    const line = indent
      .concat(prefix)
      .concat(label)
      .concat(title)

    lines.push(line)
  }
  traverseTopics(root, topicObserver)
  lines.push('') // append last empty line
  return lines.join('\n')
}

export async function parseXMindToXMindMarkFile(xmindFile: ArrayBuffer, targetSheetOrder: number = 0): Promise<XMindMarkContent> {

  const sheets = await tryExtractContentJSON(xmindFile)

  return sheets && sheets[targetSheetOrder]
    ? xmindMarkFrom(sheets[targetSheetOrder])
    : ''
}
