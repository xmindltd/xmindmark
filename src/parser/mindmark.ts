import { createMap, addTopic, addRelationship, addSingleBoundary, addSingleSummary, setTheme } from './mindmap'


const topicRE = /^(\s*)[-*]\s+/
const numberRE = /\[(\d+)\]/
const relationshipRE = /\[\^(\d+)\](\(([^\)]*)\))?/
const boundaryRE = /\[(B\d*)\]/i
const boundaryTitleRE = /^(\s*)\[(B\d*)\]/i
const summaryRE = /\[(S\d*)\]/i
const summaryTopicRE = /^(\s*)\[(S\d*)\]/i
const rangeRE = /\((\d+),(\d+)\)/

function addLine(line: string, status: any) {
  if (summaryTopicRE.test(line)) {
    let match = line.match(summaryTopicRE)!
    let indent = match[1].replace(/\t/g, '    ').length
    let name = match[2]
    line = line.replace(summaryTopicRE, '').trim()

    let currentLevel = status.levels.find(l => l.indent == indent)

    let topicId = currentLevel.parent.summaries.find(b => b.name == name).topicId
    let topicObject = currentLevel.parent.children.summary.find(t => t.id == topicId)
    topicObject.title = line

    /// process [1]
    while (numberRE.test(line)) {
      let number = line.match(numberRE)![1]
      line = line.replace(numberRE, '')
      topicObject.title = line
      status.numberedTopics[number] = topicObject
    }

    /// process [^1]
    while (relationshipRE.test(line)) {
      let match = line.match(relationshipRE)!
      let target = match[1]
      let title = match[3]
      line = line.replace(relationshipRE, '')
      topicObject.title = line
      status.relationships[target] = { source: topicObject, title }
    }

    status.lastTopic = topicObject

    return
  }

  if (boundaryTitleRE.test(line)) {
    let match = line.match(boundaryTitleRE)!
    let indent = match[1].replace(/\t/g, '    ').length
    let name = match[2]
    let title = line.replace(boundaryTitleRE, '').trim()

    let currentLevel = status.levels.find(l => l.indent == indent)

    currentLevel.parent.boundaries.find(b => b.name == name).title = title

    return
  }

  if (topicRE.test(line)) {
    let topicObject, parentObject
    let indent = line.match(topicRE)![1].replace(/\t/g, '    ').length
    line = line.replace(topicRE, '')

    let currentLevelIndex = status.levels.findIndex(l => l.indent == indent)
    if (currentLevelIndex >= 0) {
      /// find your level
      parentObject = status.levels[currentLevelIndex].parent
      status.levels = status.levels.slice(0, currentLevelIndex + 1)
    }
    else {
      /// new sub level
      let lastLevel = status.levels[status.levels.length - 1]
      if (lastLevel.indent > indent) throw 'Indentation error.'

      parentObject = status.lastTopic
      status.levels.push({ parent: parentObject, indent, boundaries: [], summaries: [] })
    }

    status.lastTopic = topicObject = addTopic(parentObject, line, { boundaries: [], summaries: [] })

    /// process [1]
    while (numberRE.test(line)) {
      let number = line.match(numberRE)![1]
      line = line.replace(numberRE, '')
      topicObject.title = line
      status.numberedTopics[number] = topicObject
    }

    /// process [^1]
    while (relationshipRE.test(line)) {
      let match = line.match(relationshipRE)!
      let target = match[1]
      let title = match[3]
      line = line.replace(relationshipRE, '')
      topicObject.title = line
      status.relationships[target] = { source: topicObject, title }
    }

    /// process [B]
    while (boundaryRE.test(line)) {
      let name = line.match(boundaryRE)![1]
      line = line.replace(boundaryRE, '')
      topicObject.title = line

      parentObject.boundaries
        .filter(b => b.name == name)
        .some(b => {
          let index = parentObject.children.attached.indexOf(topicObject)

          let match = b.range.match(rangeRE),
            start = parseInt(match[1]),
            end = parseInt(match[2])

          if (index == end + 1) {
            /// extend boundary's range
            b.range = `(${start},${index})`
            return true
          }
        })

        ||

        addSingleBoundary(parentObject, topicObject, { name })
    }

    /// process [S]
    while (summaryRE.test(line)) {
      let name = line.match(summaryRE)![1]
      line = line.replace(summaryRE, '')
      topicObject.title = line

      parentObject.summaries
        .filter(b => b.name == name)
        .some(b => {
          let index = parentObject.children.attached.indexOf(topicObject)

          let match = b.range.match(rangeRE),
            start = parseInt(match[1]),
            end = parseInt(match[2])

          if (index == end + 1) {
            /// extend summary's range
            b.range = `(${start},${index})`
            return true
          }
        })

        ||

        addSingleSummary(parentObject, topicObject, { name })
    }

  }
}

export function createMapByM3(raw = 'Central Topic'): any {
  const lines = raw.trim().split('\n')

  /// The First Line must be Central Topic

  const map = createMap(lines.shift())
  map.rootTopic.boundaries = []
  map.rootTopic.summaries = []

  const status: any = {
    levels: [
      {
        parent: map.rootTopic,
        indent: 0,
        boundaries: [],
        summaries: []
      }
    ],
    lastTopic: undefined,
    numberedTopics: {},
    relationships: {}
  }

  // Process the rest lines
  lines.filter(line => line.trim() !== '').forEach(line => addLine(line, status));

  // Create Relationships
  (Object.entries(status.relationships) as any).forEach(([number, { source, title }]) => {
    if (!status.numberedTopics[number]) throw `No topic [${number}] for creating a relationship.`
    addRelationship(map, source, status.numberedTopics[number], { title })
  })

  setTheme(map)
  return map
}