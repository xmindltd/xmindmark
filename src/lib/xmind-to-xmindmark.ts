import JSZip from 'jszip'
import { BoundaryModel, SheetModel, SummaryModel, TopicModel } from '../types'

export type XMindMarkContent = string

export async function parseXMindToXMindMarkFile(xmindFile: ArrayBuffer): Promise<XMindMarkContent> {

  const sheets = await tryExtractContentJSON(xmindFile)

  return sheets && sheets.length > 0
    ? xmindMarkFrom(sheets[0])
    : ''
}

async function tryExtractContentJSON(file: ArrayBuffer): Promise<SheetModel[] | null> {
  try {
    const zip = await new JSZip().loadAsync(file)
    const contentJSON = await zip.file('content.json')?.async('string')

    return JSON.parse(contentJSON ?? '') as SheetModel[]
  } catch (e) {
    return null
  }
}

type ScopeContext = {
  readonly layer: number
  readonly boundaries?: BoundaryModel[]
  readonly summaries?: SummaryModel[]
  boundaryIdentifier: number
  summaryIdentifier: number
}
type Context = ScopeContext & {
  readonly labels: string[]
  readonly title: string
}
type TraverseCallback = (ctx: Context) => void

function traverseTopics(topic: TopicModel, callback: TraverseCallback, scopeContext?: ScopeContext) {
  const defaultScopeContext: ScopeContext = {
    layer: 0,
    boundaries: topic.boundaries,
    summaries: topic.summaries,
    boundaryIdentifier: 1,
    summaryIdentifier: 1
  }
  const context: Context = {
    labels: topic.labels ?? [],
    title: topic.title,
    ...(scopeContext ?? defaultScopeContext)
  }
  callback(context)

  const currentScopeContext: ScopeContext = {
    layer: scopeContext?.layer ? scopeContext.layer + 1 : 1,
    boundaries: topic.boundaries,
    summaries: topic.summaries,
    boundaryIdentifier: 1,
    summaryIdentifier: 1
  }
  topic.children?.attached?.forEach(child => traverseTopics(child, callback, currentScopeContext))
}

function xmindMarkFrom(sheet: SheetModel): XMindMarkContent {
  const lines: string[] = []
  const root = sheet.rootTopic
  traverseTopics(root, ({ labels, title, layer }) => {
    const indent = Array.from({ length: layer }).reduce(ind => ind += '    ', '')
    const prefix = layer > 0 ? '- ' : ''
    const label = labels.length > 0 ? `[${labels.map(v => v.trim()).join(', ')}] ` : ''
    const line = `${indent}${prefix}${label}${title}`
    lines.push(line)
  })
  return lines.join('\n')
}
