export type TopicModel = {
  id: string,
  class: string,
  title: string,
  structureClass: string,
  titleUnedited: boolean,
  boundaries?: Boundary[],
  summaries?: Summary[]
}

export type SheetModel = {
  id: string,
  class: string,
  title: string,
  rootTopic: TopicModel,
  topicPositioning: string,
}

export type MapElement = {
  theme: Record<string, any>,
  rootTopic: any
}

export type Boundary = {}
export type Summary = {}
