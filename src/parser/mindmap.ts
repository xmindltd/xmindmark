import { nanoid } from 'nanoid'
import { SheetModel } from '../types'

const UUID = nanoid
export const setTheme = (mapObject: any) => {
  mapObject.theme = {
    "id": "f8c8e44f-4a4d-43a7-8381-11a152eaf8a3",
    "centralTopic": {
      "id": "c5069014-b642-4cf5-bb50-1d29bd0df2a1",
      "properties": {
        "svg:fill": "#000229",
        "line-color": "#000229",
        "shape-class": "org.xmind.topicShape.roundedRect",
        "line-class": "org.xmind.branchConnection.curve",
        "line-width": "3pt",
        "line-pattern": "solid",
        "fill-pattern": "solid",
        "border-line-width": "0pt",
        "arrow-end-class": "org.xmind.arrowShape.none",
        "alignment-by-level": "inactived",
        "fo:font-family": "NeverMind",
        "fo:font-style": "normal",
        "fo:font-weight": 500,
        "fo:font-size": "30pt",
        "fo:text-transform": "manual",
        "fo:text-decoration": "none",
        "fo:text-align": "center"
      }
    },
    "mainTopic": {
      "id": "70cef26a-bf8a-4a75-a3ba-c39b54a6401d",
      "properties": {
        "shape-class": "org.xmind.topicShape.roundedRect",
        "line-class": "org.xmind.branchConnection.roundedElbow",
        "line-width": "2pt",
        "fill-pattern": "solid",
        "border-line-width": "0pt",
        "fo:font-family": "NeverMind",
        "fo:font-style": "normal",
        "fo:font-weight": 500,
        "fo:font-size": "18pt",
        "fo:text-transform": "manual",
        "fo:text-decoration": "none",
        "fo:text-align": "left"
      }
    },
    "subTopic": {
      "id": "d5c7d9c0-e954-4c99-9e01-91cccd629c22",
      "properties": {
        "shape-class": "org.xmind.topicShape.roundedRect",
        "line-class": "org.xmind.branchConnection.roundedElbow",
        "line-width": "2pt",
        "fill-pattern": "solid",
        "border-line-width": "0pt",
        "fo:font-family": "NeverMind",
        "fo:font-style": "normal",
        "fo:font-weight": 400,
        "fo:font-size": "14pt",
        "fo:text-transform": "manual",
        "fo:text-decoration": "none",
        "fo:text-align": "left"
      }
    },
    "summaryTopic": {
      "id": "dc5d147f-2c2a-423f-8d4f-26c6e4cdc4ec",
      "properties": {
        "svg:fill": "none",
        "border-line-color": "#000229",
        "shape-class": "org.xmind.topicShape.roundedRect",
        "line-class": "org.xmind.branchConnection.roundedElbow",
        "fill-pattern": "solid",
        "fo:font-family": "NeverMind",
        "fo:font-style": "normal",
        "fo:font-weight": "400",
        "fo:font-size": "14pt",
        "fo:text-transform": "manual",
        "fo:text-decoration": "none",
        "fo:text-align": "left"
      }
    },
    "calloutTopic": {
      "id": "b2ccd2cb-e4d0-4c1d-8615-fea7a1b98854",
      "properties": {
        "svg:fill": "#000229",
        "border-line-color": "#000229",
        "callout-shape-class": "org.xmind.calloutTopicShape.balloon.roundedRect",
        "fill-pattern": "solid",
        "fo:font-family": "NeverMind",
        "fo:font-style": "normal",
        "fo:font-weight": 400,
        "fo:font-size": "14pt",
        "fo:text-transform": "manual",
        "fo:text-decoration": "none",
        "fo:text-align": "left"
      }
    },
    "floatingTopic": {
      "id": "1db99452-2bb0-4de8-87f5-cdeb8a591d7b",
      "properties": {
        "svg:fill": "#EEEBEE",
        "border-line-color": "#EEEBEE",
        "shape-class": "org.xmind.topicShape.roundedRect",
        "line-class": "org.xmind.branchConnection.roundedElbow",
        "line-width": "2pt",
        "line-pattern": "solid",
        "fill-pattern": "solid",
        "border-line-width": "0pt",
        "arrow-end-class": "org.xmind.arrowShape.none",
        "fo:font-family": "NeverMind",
        "fo:font-style": "normal",
        "fo:font-weight": 500,
        "fo:font-size": "14pt",
        "fo:text-transform": "manual",
        "fo:text-decoration": "none",
        "fo:text-align": "left"
      }
    },
    "boundary": {
      "id": "beaff7ce-691f-481d-847c-c5f43d125660",
      "properties": {
        "svg:fill": "#000229",
        "line-color": "#000229",
        "shape-class": "org.xmind.boundaryShape.roundedRect",
        "shape-corner": "20pt",
        "line-width": "2",
        "line-pattern": "dash",
        "fill-pattern": "solid",
        "fo:font-family": "'NeverMind','Microsoft YaHei','PingFang SC','Microsoft JhengHei','sans-serif',sans-serif",
        "fo:font-style": "normal",
        "fo:font-weight": 400,
        "fo:font-size": "14pt",
        "fo:text-transform": "manual",
        "fo:text-decoration": "none",
        "fo:text-align": "center"
      }
    },
    "summary": {
      "id": "7e7d8704-9339-4a37-a8dc-f3a3aa2f4cf2",
      "properties": {
        "line-color": "#000229",
        "shape-class": "org.xmind.summaryShape.round",
        "line-width": "2pt",
        "line-pattern": "solid",
        "line-corner": "8pt"
      }
    },
    "relationship": {
      "id": "81c8d0be-6082-4a1c-b88c-23b1445e0647",
      "properties": {
        "line-color": "#000229",
        "shape-class": "org.xmind.relationshipShape.curved",
        "line-width": "2",
        "line-pattern": "dash",
        "arrow-begin-class": "org.xmind.arrowShape.none",
        "arrow-end-class": "org.xmind.arrowShape.triangle",
        "fo:font-family": "'NeverMind','Microsoft YaHei','PingFang SC','Microsoft JhengHei','sans-serif',sans-serif",
        "fo:font-style": "normal",
        "fo:font-weight": 400,
        "fo:font-size": "13pt",
        "fo:text-transform": "manual",
        "fo:text-decoration": "none",
        "fo:text-align": "center"
      }
    },
    "map": {
      "id": "ea5bbe08-7b7a-4b13-a4ee-49b20dcc4de2",
      "properties": {
        "svg:fill": "#ffffff",
        "multi-line-colors": "#F9423A #F6A04D #F3D321 #00BC7B #486AFF #4D49BE",
        "color-list": "#000229 #1F2766 #52CC83 #4D86DB #99142F #245570",
        "line-tapered": "none"
      }
    },
    "importantTopic": {
      "id": "6c4e5a0a-db82-4dc6-9816-213ad1a38238",
      "properties": {
        "svg:fill": "#460400",
        "fill-pattern": "solid",
        "border-line-color": "#460400"
      }
    },
    "minorTopic": {
      "id": "febf0c47-d75e-4149-a07f-a44cf847e7ab",
      "properties": {
        "svg:fill": "#703D00",
        "fill-pattern": "solid",
        "border-line-color": "#703D00"
      }
    },
    "colorThemeId": "Rainbow-#000229-MULTI_LINE_COLORS",
    "expiredTopic": {
      "id": "c2afd293-7843-4ca4-b01f-4353768628ea",
      "properties": {
        "fo:text-decoration": "line-through",
        "svg:fill": "none"
      }
    },
    "global": {
      "id": "53109c3b-6577-4e2d-bd2e-b768723f6436",
      "properties": {}
    },
    "skeletonThemeId": "db4a5df4db39a8cd1310ea55ea"
  }
  const skeletonExtension = {
    "provider": "org.xmind.ui.skeleton.structure.style",
    "content": {
      "centralTopic": "org.xmind.ui.map.clockwise",
      "mainTopic": "org.xmind.ui.logic.right"
    }
  }
  if (mapObject.extensions && Array.isArray(mapObject.extensions)) {
    mapObject.extensions.push(skeletonExtension)
  } else {
    mapObject.extensions = [skeletonExtension]
  }
}

export const createMap = (centralTopic = 'Central Topic', options = {}): SheetModel => ({
  id: UUID(),
  class: "sheet",
  title: centralTopic,
  rootTopic: {
    id: UUID(),
    class: "topic",
    title: centralTopic,
    structureClass: "org.xmind.ui.logic.right",
    titleUnedited: true,
  },
  topicPositioning: "fixed",
  ...options
})

export const addTopic = (parentObject, mainTopic = "Main Topic", options = {}) => {
  parentObject = parentObject.rootTopic || parentObject
  parentObject.children = parentObject.children || {}
  parentObject.children.attached = parentObject.children.attached || []

  const topicObject = {
    id: UUID(),
    title: mainTopic,
    titleUnedited: true,
    ...options
  }
  parentObject.children.attached.push(topicObject)

  return topicObject
}

export const setHyperlink = (topicObject, href) => {
  topicObject.href = href
}

export const fold = topicObject => {
  topicObject.branch = "folded"
}

export const setTextNotes = (topicObject, textContent, htmlContent) => {
  topicObject.notes = {
    plain: {
      content: textContent
    },
    realHTML: {
      content: htmlContent
    }
  }
}

export const makeKeyValueTable = (topicObject, keyValueObject) => {
  topicObject.structureClass = "org.xmind.ui.spreadsheet"
  topicObject.extensions = topicObject.extensions || []
  topicObject.extensions.push({
    provider: "org.xmind.ui.spreadsheet",
    content: [
      {
        name: "columns",
        content: [
          {
            name: "column",
            content: ""
          }
        ]
      }
    ]
  })

  Object.entries(keyValueObject).forEach(([key, value]) => {
    addTopic(addTopic(topicObject, key), value as any)
  })
}

export const allTopics = mapObject => {
  let ret: any[] = []

  function walk(topicObject) {
    ret.push(topicObject)
      ; ((topicObject.children || {}).attached || []).forEach(walk)
  }

  walk(mapObject.rootTopic)
  return ret
}

export const addRelationship = (mapObject, topic1, topic2, options = {}) => {
  const relationship = {
    id: UUID(),
    end1Id: topic1.id,
    end2Id: topic2.id,
    titleUnedited: true,
    ...options
  }
  mapObject.relationships = mapObject.relationships || []
  mapObject.relationships.push(relationship)
  return relationship
}

export const addSingleBoundary = (parentObject, topicObject, options = {}) => {
  const index = parentObject.children.attached.indexOf(topicObject)
  const boundary = {
    id: UUID(),
    range: `(${index},${index})`,
    ...options
  }
  parentObject.boundaries = parentObject.boundaries || []
  parentObject.boundaries.push(boundary)
  return boundary
}

export const addSingleSummary = (parentObject, topicObject, options = {}) => {
  const summaryTopic = {
    id: UUID(),
    title: "Summary",
    titleUnedited: true,
    ...options
  }
  parentObject.children.summary = parentObject.children.summary || []
  parentObject.children.summary.push(summaryTopic)

  const index = parentObject.children.attached.indexOf(topicObject)
  const summary = {
    id: UUID(),
    range: `(${index},${index})`,
    topicId: summaryTopic.id,
    ...options
  }
  parentObject.summaries = parentObject.summaries || []
  parentObject.summaries.push(summary)
  return { summaryTopic, summary }
}
