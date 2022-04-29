import JSZip from 'jszip'
import { BoundaryModel, SheetModel, SummaryModel, TopicModel, TopicType } from '../types'

export type XMindMarkContent = string

type Identifier = { readonly identifier: string }
type Boundary = BoundaryModel & Identifier
type Summary = SummaryModel & Identifier & {
  title: string
}
type BranchScope = {
  readonly depth: number
  readonly boundaries: Boundary[]
  readonly summaries: Summary[]
}
type TopicScope = BranchScope & {
  readonly id: string
  readonly labels: string[]
  readonly title: string
  readonly order: number // starts from 0, like index
  readonly type: TopicType | 'root'
}
type TopicScopeObserver = (scope: TopicScope) => void
type BranchScopeObserver = (scope: BranchScope) => void
type ClosedRange = `(${number},${number})`

export async function parseXMindToXMindMarkFile(xmindFile: ArrayBuffer, targetSheetOrder: number = 0): Promise<XMindMarkContent> {

  const sheets = await tryExtractContentJSON(xmindFile)

  return sheets && sheets[targetSheetOrder]
    ? xmindMarkFrom(sheets[targetSheetOrder])
    : ''
}

function xmindMarkFrom({ rootTopic }: SheetModel): XMindMarkContent {
  const lines: string[] = []

  const topicScopeObserver: TopicScopeObserver = (scope) => {
    const indent = makeIndentOfLine(scope)
    const prefix = makePrefixOfLine(scope)
    const typeIdentifier = makeTypeIdentifierOfLine(scope)
    const label = makeLabelOfLine(scope)
    const title = makeTitleOfLine(scope)
    const extensionIdentifier = makeExtensionIdentifierOfLine(scope)

    const line = indent.concat(...[
      prefix,
      typeIdentifier.length > 0 ? `${typeIdentifier}: ` : '',
      label.length > 0 ? `${label} ` : '',
      title,
      extensionIdentifier,
    ])

    lines.push(line)
  }

  const branchScopeObserver: BranchScopeObserver = (scope) => {
    scope.boundaries.forEach(boundary => {
      if (boundary.title) {
        lines.push(makeBoundaryTitleLine(scope, boundary))
      }
    })
  }

  traverseBranch(rootTopic, topicScopeObserver, branchScopeObserver)
  lines.push('') // append last empty line
  return lines.join('\n')
}

function traverseBranch(
  rootTopic: TopicModel,
  onTopicScope: TopicScopeObserver,
  onBranchScope: BranchScopeObserver,
  index?: number,
  prevBranchScope?: BranchScope,
  type?: TopicType
) {
  const branchScope: BranchScope = {
    depth: prevBranchScope?.depth ?? 0,
    boundaries: prevBranchScope?.boundaries ?? makeIdentifyBoundaries(rootTopic),
    summaries: prevBranchScope?.summaries ?? makeIdentifySummaries(rootTopic)
  }

  const topicScope: TopicScope = {
    id: rootTopic.id,
    labels: rootTopic.labels ?? [],
    title: rootTopic.title ?? '',
    order: index ?? 0,
    type: type ?? 'root',
    ...branchScope
  }

  onTopicScope(topicScope)

  const currentBranchScope: BranchScope = {
    depth: branchScope.depth + 1,
    boundaries: makeIdentifyBoundaries(rootTopic),
    summaries: makeIdentifySummaries(rootTopic)
  }

  rootTopic.children?.attached?.forEach((child, i) => traverseBranch(child, onTopicScope, onBranchScope, i, currentBranchScope, 'attached'))
  rootTopic.children?.summary?.forEach((child, i) => traverseBranch(child, onTopicScope, onBranchScope, i, currentBranchScope, 'summary'))

  onBranchScope(currentBranchScope)
}

///////////////////////////////////////////
// 
// File loader
//

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

///////////////////////////////////////////
// 
// Converters
//

function isOrderInsideRange(range: ClosedRange, order: number): boolean {
  const [start, end] = range.replace(/[\(|\)]/g, '')
    .split(',')
    .map(s => parseInt(s.trim()))

  return start <= end && start <= order && order <= end
}

function makeIndentOfLine({ depth }: Pick<TopicScope, 'depth'>): string {
  return Array.from({ length: depth }).reduce<string>(prevIndent => prevIndent.concat('    '), '')
}

function makePrefixOfLine({ depth, type }: TopicScope): string {
  if (type === 'attached') return depth > 0 ? '- ' : ''

  return ''
}

function makeTypeIdentifierOfLine({ type, id, summaries }: TopicScope): string {
  if (type === 'summary') {
    const summary = summaries.find(summary => summary.topicId === id)
    return summary
      ? `[${summary.identifier}]`
      : ''
  }

  return ''
}

function makeLabelOfLine({ labels }: TopicScope): string {
  return labels.length > 0 ? `[${labels.map(v => v.trim()).join(', ')}]` : ''
}

function makeTitleOfLine({ title }: TopicScope): string {
  return title
}

function makeBoundaryIdenfitierOfLine(scope: TopicScope): string {
  const { boundaries, type } = scope
  if (type !== 'attached' || !boundaries || boundaries.length === 0) return ''

  if (boundaries.length === 1) return isOrderInsideRange(boundaries[0].range, scope.order) ? `[${boundaries[0].identifier}]` : ''
  else return boundaries.reduce(
    (str, { range, identifier }) => isOrderInsideRange(range, scope.order)
      ? `${str}[${identifier}]`
      : str,
    ''
  )
}

function makeSummaryIdentifierOfLine(scope: TopicScope): string {
  const { summaries, type } = scope
  if (type === 'root' || type === 'summary' || !summaries || summaries.length === 0) return ''

  if (summaries.length === 1) return isOrderInsideRange(summaries[0].range, scope.order) ? `[${summaries[0].identifier}]` : ''
  else return summaries.reduce(
    (str, { range, identifier }) => isOrderInsideRange(range, scope.order)
      ? `${str}[${identifier}]`
      : str,
    ''
  )
}

function makeExtensionIdentifierOfLine(scope: TopicScope): string {
  const boundaryIdentifier = makeBoundaryIdenfitierOfLine(scope)
  const summaryIdentifier = makeSummaryIdentifierOfLine(scope)

  return boundaryIdentifier || summaryIdentifier
    ? ` ${boundaryIdentifier}${summaryIdentifier}`
    : ''
}

function makeBoundaryTitleLine(scope: BranchScope, { identifier, title }: Boundary): string {
  return `${makeIndentOfLine(scope)}[${identifier}]: ${title}`
}

function makeIdentifyBoundaries(topic: TopicModel): Boundary[] {
  if (!topic.boundaries || topic.boundaries.length === 0) return []

  if (topic.boundaries.length === 1) return [{ ...topic.boundaries[0], identifier: 'B' }]

  return topic.boundaries.map((boundary, i) => ({ ...boundary, identifier: `B${i + 1}`}))
}

function makeIdentifySummaries(topic: TopicModel): Summary[] {
  if (
    topic.summaries
    && topic.summaries.length > 0
    && topic.children
    && (Array.isArray(topic.children?.summary) && topic.children.summary.length > 0)
    && topic.children.summary.length === topic.summaries.length
  ) {
    const summaries = topic.summaries.map((summary, i) => {
      const title = topic.children!.summary?.find(({ id }) => id === summary.topicId )?.title

      return typeof title !== 'undefined'
        ? { ...summary, title, identifier: `S${i + 1}` }
        : null
    }).filter((summary): summary is Summary => !!summary)

    if (summaries.length === 1) return summaries.map(summary => ({ ...summary, identifier: 'S' }))

    return summaries
  }

  return []
}