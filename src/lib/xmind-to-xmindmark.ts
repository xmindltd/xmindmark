import JSZip from 'jszip'
import { BoundaryModel, SheetModel, SummaryModel, TopicModel } from '../types'

export type XMindMarkContent = string

type Identifier = { identifier: string }
type TokenBuilder = (scope: TopicScope) => string
type BoundaryModelWithIdentifier = BoundaryModel & Identifier
type SummaryModelWithIdentifier = SummaryModel & Identifier
type BranchScope = {
  readonly depth: number
  readonly boundaries?: BoundaryModelWithIdentifier[]
  readonly summaries?: SummaryModelWithIdentifier[]
}
type TopicScope = BranchScope & {
  readonly labels: string[]
  readonly title: string
  readonly order: number // starts from 0, like index
  readonly isRoot: boolean
}
type TopicScopeObserver = (scope: TopicScope) => void
type BranchScopeObserver = (scope: BranchScope) => void
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

function identifiedArray<T>(arr: T[], prefix: string): (T & { identifier: string })[] {
  if (arr.length === 0) return []
  else if (arr.length === 1) return [{ ...arr[0], identifier: prefix }]
  else return arr.map((v, i) => ({ ...v, identifier: `${prefix}${i + 1}` }))
}

function traverseBranch(
  rootTopic: TopicModel,
  onTopicScope: TopicScopeObserver,
  onBranchScope: BranchScopeObserver,
  index?: number,
  currentBranchScope?: BranchScope
) {
  const branchScope: BranchScope = {
    depth: currentBranchScope?.depth ?? 0,
    boundaries: currentBranchScope?.boundaries ?? identifiedArray(rootTopic.boundaries ?? [], 'B'),
    summaries: currentBranchScope?.summaries ?? identifiedArray(rootTopic.summaries ?? [], 'S')
  }

  const topicScope: TopicScope = {
    labels: rootTopic.labels ?? [],
    title: rootTopic.title ?? '',
    order: index ?? 0,
    isRoot: branchScope.depth === 0,
    ...branchScope
  }

  onTopicScope(topicScope)

  const nextBranchScope: BranchScope = {
    depth: branchScope.depth + 1,
    boundaries: identifiedArray(rootTopic.boundaries ?? [], 'B'),
    summaries: identifiedArray(rootTopic.summaries ?? [], 'S')
  }

  rootTopic.children?.attached?.forEach((child, i) => traverseBranch(child, onTopicScope, onBranchScope, i, nextBranchScope))

  onBranchScope(branchScope)
}

function orderInsideRange(range: ClosedRange, order: number): boolean {
  const [start, end] = range.replace(/[\(|\)]/g, '')
    .split(',')
    .map(s => parseInt(s.trim()))

  return start <= end && start <= order && order <= end
}

function makeIndentOfLine({ depth }: TopicScope): string {
  return Array.from({ length: depth }).reduce<string>(prevIndent => prevIndent.concat('    '), '')
}

function makePrefixOfLine({ depth }: TopicScope): string {
  return depth > 0 ? '- ' : ''
}
function makeLabelOfLine({ labels }: TopicScope): string {
  return labels.length > 0 ? `[${labels.map(v => v.trim()).join(', ')}]` : ''
}
function makeTitleOfLine({ title }: TopicScope): string {
  return title
}
function makeBoundaryOfLine(scope: TopicScope): string {
  const { boundaries, isRoot } = scope
  if (isRoot || !boundaries || boundaries.length === 0) return ''

  if (boundaries.length === 1) return orderInsideRange(boundaries[0].range, scope.order) ? `[${boundaries[0].identifier}]` : ''
  else return boundaries.reduce(
    (str, { range, identifier }) => orderInsideRange(range, scope.order)
      ? `${str}[${identifier}]`
      : str,
    ''
  )
}
const makeSummaryOfLine: TokenBuilder = (scope) => {
  const { summaries, isRoot } = scope
  if (isRoot || !summaries || summaries.length === 0) return ''

  if (summaries.length === 1) return orderInsideRange(summaries[0].range, scope.order) ? `[${summaries[0].identifier}]` : ''
  else return summaries.reduce(
    (str, { range, identifier }) => orderInsideRange(range, scope.order)
      ? `${str}[${identifier}]`
      : str,
    ''
  )
}

function xmindMarkFrom({ rootTopic }: SheetModel): XMindMarkContent {
  const lines: string[] = []

  const topicScopeObserver: TopicScopeObserver = (scope) => {
    const indent = makeIndentOfLine(scope)
    const prefix = makePrefixOfLine(scope)
    const label = makeLabelOfLine(scope)
    const title = makeTitleOfLine(scope)
    const boundary = makeBoundaryOfLine(scope)
    const summary = makeSummaryOfLine(scope)
    
    const line = indent
      .concat(prefix)
      .concat(label.length > 0 ? `${label} ` : '')
      .concat(title)
      .concat(boundary.length > 0 ? ` ${boundary}` : '')
      .concat(summary.length > 0 ? ` ${summary}` : '')

    lines.push(line)
  }

  const branchScopeObserver: BranchScopeObserver = (scope) => {
    return
  }
  traverseBranch(rootTopic, topicScopeObserver, branchScopeObserver)
  lines.push('') // append last empty line
  return lines.join('\n')
}

export async function parseXMindToXMindMarkFile(xmindFile: ArrayBuffer, targetSheetOrder: number = 0): Promise<XMindMarkContent> {

  const sheets = await tryExtractContentJSON(xmindFile)

  return sheets && sheets[targetSheetOrder]
    ? xmindMarkFrom(sheets[targetSheetOrder])
    : ''
}
