export type TopicModel = {
  id: string,
  title: string,
  class?: string,
  structureClass?: string,
  titleUnedited?: boolean,
  boundaries?: BoundaryModel[],
  summaries?: SummaryModel[],
  labels?: string[],
  children?: TopicChildren
}

export type TopicChildren = Partial<Record<TopicType, TopicModel[]>>

export type TopicType = 'attached' | 'detached' | 'summary'

export type SheetModel = {
  id: string,
  class: string,
  title: string,
  rootTopic: TopicModel,
  topicPositioning: string,
  relationships?: RelationshipModel[]
}
type RangeDifinition = `(${number},${number})`
export type BoundaryModel = {
  id: string,
  title: string,
  range: RangeDifinition,
  titleUnedited: boolean
}
export type SummaryModel = {
  id: string,
  range: RangeDifinition,
  topicId: string
}
export type RelationshipModel = {
  id: string,
  end1Id: string,
  end2Id: string,
  title: string
}
