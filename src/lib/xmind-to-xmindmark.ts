import JSZip from 'jszip'
import { BoundaryModel, SheetModel, SummaryModel, TopicModel } from '../types'

export type XMindMarkContent = string

type Identifier = { identifier: string }
type TokenBuilder = (context: TopicContext) => string
type BoundaryModelWithIdentifier = BoundaryModel & Identifier
type SummaryModelWithIdentifier = SummaryModel & Identifier
type LayerContext = {
  readonly depth: number
  readonly boundaries?: BoundaryModelWithIdentifier[]
  readonly summaries?: SummaryModelWithIdentifier[]
}
type TopicContext = LayerContext & {
  readonly labels: string[]
  readonly title: string
  readonly index: number
  readonly isRoot: boolean
}
type TopicContextObserver = (ctx: TopicContext) => void
type ClosedRange = `(${number},${number})`

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


function traverseTopics(
  topic: TopicModel,
  index: number,
  topicObserver: TopicContextObserver,
  scopeContext?: LayerContext
) {
  const identifiyArray = <T>(arr: T[], prefix: string): (T & { identifier: string })[] => {
    if (arr.length === 0) return []
    else if (arr.length === 1) return [{ ...arr[0], identifier: prefix }]
    else return arr.map((v, i) => ({ ...v, identifier: `${prefix}${i + 1}` }))
  }

  const labels = topic.labels ?? []
  const title = topic.title ?? ''
  const depth = scopeContext?.depth ?? 0
  const isRoot = depth === 0
  const boundaries = scopeContext?.boundaries ?? identifiyArray(topic.boundaries ?? [], 'B')
  const summaries = scopeContext?.summaries ?? identifiyArray(topic.summaries ?? [], 'S')

  const context: TopicContext = { labels, title, index, depth, isRoot, boundaries, summaries }
  topicObserver(context)

  const nextScopeContext: LayerContext = {
    depth: depth + 1,
    boundaries: identifiyArray(topic.boundaries ?? [], 'B'),
    summaries: identifiyArray(topic.summaries ?? [], 'S')
  }
  topic.children?.attached?.forEach((child, i) => traverseTopics(child, i, topicObserver, nextScopeContext))
}

const indexInsideRange = (range: ClosedRange, index: number): boolean => {
  const [start, end] = range.replace(/[\(|\)]/g, '').split(',').map(s => parseInt(s.trim()))
  return start <= end && start <= index && index <= end
}

const makeIndentOfLine: TokenBuilder = ({ depth }) => Array.from({ length: depth }).reduce<string>(prevIndent => prevIndent.concat('    '), '')
const makePrefixOfLine: TokenBuilder = ({ depth }) => depth > 0 ? '- ' : ''
const makeLabelOfLine: TokenBuilder = ({ labels }) => labels.length > 0 ? `[${labels.map(v => v.trim()).join(', ')}]` : ''
const makeTitleOfLine: TokenBuilder = ({ title }) => title
const makeBoundaryOfLine: TokenBuilder = (context) => {
  const { boundaries, isRoot } = context
  if (isRoot || !boundaries || boundaries.length === 0) return ''

  if (boundaries.length === 1) return indexInsideRange(boundaries[0].range, context.index) ? `[${boundaries[0].identifier}]` : ''
  else return boundaries.reduce(
    (str, { range, identifier }) => indexInsideRange(range, context.index)
      ? `${str}[${identifier}]`
      : str,
    ''
  )
}
const makeSummaryOfLine: TokenBuilder = (context) => {
  const { summaries, isRoot } = context
  if (isRoot || !summaries || summaries.length === 0) return ''

  if (summaries.length === 1) return indexInsideRange(summaries[0].range, context.index) ? `[${summaries[0].identifier}]` : ''
  else return summaries.reduce(
    (str, { range, identifier }) => indexInsideRange(range, context.index)
      ? `${str}[${identifier}]`
      : str,
    ''
  )
}

function xmindMarkFrom(sheet: SheetModel): XMindMarkContent {
  const lines: string[] = []
  const root = sheet.rootTopic
  const topicObserver: TopicContextObserver = (context) => {
    const indent = makeIndentOfLine(context)
    const prefix = makePrefixOfLine(context)
    const label = makeLabelOfLine(context)
    const title = makeTitleOfLine(context)
    const boundary = makeBoundaryOfLine(context)
    const summary = makeSummaryOfLine(context)
    
    const line = indent
      .concat(prefix)
      .concat(label.length > 0 ? `${label} ` : '')
      .concat(title)
      .concat(boundary.length > 0 ? ` ${boundary}` : '')
      .concat(summary.length > 0 ? ` ${summary}` : '')

    lines.push(line)
  }
  traverseTopics(root, 0, topicObserver)
  lines.push('') // append last empty line
  return lines.join('\n')
}

export async function parseXMindToXMindMarkFile(xmindFile: ArrayBuffer, targetSheetOrder: number = 0): Promise<XMindMarkContent> {

  const sheets = await tryExtractContentJSON(xmindFile)

  return sheets && sheets[targetSheetOrder]
    ? xmindMarkFrom(sheets[targetSheetOrder])
    : ''
}
