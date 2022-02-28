import { nanoid } from 'nanoid'
import { SheetModel } from '../types'

const UUID = nanoid
export const setTheme = (mapObject, blueOrRed: boolean) => {
    mapObject.theme = blueOrRed ? {
        "id": "3eaa37f5c60a8243ce9c899e97",
        "importantTopic": {
            "type": "topic",
            "properties": {
                "fo:font-weight": "bold",
                "fo:color": "#434B54",
                "svg:fill": "#FF8D3E"
            }
        },
        "minorTopic": {
            "type": "topic",
            "properties": {
                "fo:font-weight": "bold",
                "fo:color": "#434B54",
                "svg:fill": "#FBD400"
            }
        },
        "expiredTopic": {
            "type": "topic",
            "properties": {
                "fo:font-style": "italic",
                "fo:text-decoration": " line-through"
            }
        },
        "centralTopic": {
            "properties": {
                "fo:font-family": "Open Sans",
                "fo:font-weight": "600",
                "svg:fill": "#5A729A",
                "line-color": "#8793A5",
                "fo:font-size": "28pt",
                "fo:font-style": "normal",
                "line-width": "2",
                "line-class": "org.xmind.branchConnection.roundedElbow",
                "border-line-width": "0"
            },
            "styleId": "38355ca7-ef80-447e-a26d-4cd43f3a22ad",
            "type": "topic"
        },
        "boundary": {
            "properties": {
                "line-color": "#F78A4A",
                "svg:fill": "#FCE7D9",
                "fo:color": "#FFFFFF",
                "fo:font-size": "13pt",
                "fo:font-weight": "600",
                "fo:font-style": "normal",
                "fo:font-family": "Open Sans"
            },
            "styleId": "de560b54-741b-4378-baa4-55dffea58dbc",
            "type": "boundary"
        },
        "floatingTopic": {
            "properties": {
                "svg:fill": "#F78A4A",
                "border-line-width": "0",
                "fo:font-family": "Open Sans",
                "fo:font-weight": "600",
                "line-color": "#F78A4A",
                "line-width": "2",
                "fo:font-style": "normal"
            },
            "styleId": "11ef2512-3d62-49c3-a087-d5f592486857",
            "type": "topic"
        },
        "subTopic": {
            "properties": {
                "fo:font-weight": "normal",
                "fo:color": "#434B54",
                "fo:font-family": "Open Sans",
                "fo:text-align": "left",
                "fo:font-size": "14pt"
            },
            "styleId": "39b44e58-ce5d-4dcb-86d1-a3f28b854a13",
            "type": "topic"
        },
        "mainTopic": {
            "properties": {
                "fo:font-weight": "normal",
                "fo:color": "#434B54",
                "fo:font-family": "Open Sans",
                "fo:font-size": "18pt",
                "fo:text-align": "left",
                "svg:fill": "#96D2E7",
                "border-line-width": "0"
            },
            "styleId": "844db6e0-df02-4a81-bbaa-b9f89020df0a",
            "type": "topic"
        },
        "calloutTopic": {
            "properties": {
                "svg:fill": "#F78A4A",
                "border-line-width": "0",
                "fo:font-family": "Open Sans",
                "fo:font-weight": "600",
                "fo:font-style": "normal",
                "fo:font-size": "13pt"
            },
            "styleId": "46a7417f-3317-4893-bb0c-be98b705a3b5",
            "type": "topic"
        },
        "summary": {
            "properties": {
                "shape-class": "org.xmind.summaryShape.round",
                "line-color": "#F78A4A"
            },
            "styleId": "77dbc8b8661ae51aaf517be0dd",
            "type": "summary"
        },
        "summaryTopic": {
            "properties": {
                "svg:fill": "#F78A4A",
                "border-line-width": "0",
                "fo:font-family": "Open Sans",
                "fo:font-weight": "600",
                "fo:font-style": "normal",
                "line-color": "#F78A4A"
            },
            "styleId": "cb3ca2a3-0856-43d6-b4e8-b82ff8ec6190",
            "type": "topic"
        },
        "relationship": {
            "properties": {
                "fo:color": "#434B54",
                "fo:font-family": "Open Sans",
                "fo:font-weight": "600",
                "line-pattern": "solid",
                "line-width": "2pt",
                "line-color": "#F78A4A",
                "fo:font-style": "normal",
                "fo:font-size": "13pt"
            },
            "styleId": "4a862957-6907-4217-90bd-cc1cd69653fb",
            "type": "relationship"
        },
        "map": {
            "properties": {
                "line-tapered": "normal",
                "svg:fill": "#F5FAFF"
            },
            "styleId": "14bc424b-3874-4a09-9e8e-f4182294da22",
            "type": "map"
        }
    } : {
        "id": "70f8ab9d9ee8eedfdcc109e5c5",
        "importantTopic": {
            "type": "topic",
            "properties": {
                "fo:font-weight": "bold",
                "fo:color": "#111111",
                "svg:fill": "#FDD834"
            }
        },
        "minorTopic": {
            "type": "topic",
            "properties": {
                "fo:font-weight": "bold",
                "fo:color": "#111111",
                "svg:fill": "#FF9F00"
            }
        },
        "expiredTopic": {
            "type": "topic",
            "properties": {
                "fo:font-style": "italic",
                "fo:text-decoration": " line-through"
            }
        },
        "centralTopic": {
            "type": "topic",
            "styleId": "b182c390-27ee-44ea-96fe-db997536db33",
            "properties": {
                "svg:fill": "#FF5252",
                "border-line-width": "4",
                "border-line-color": "#FF9595",
                "line-width": "3",
                "line-color": "#FF9595",
                "fo:font-weight": "700",
                "fo:font-style": "normal"
            }
        },
        "mainTopic": {
            "type": "topic",
            "styleId": "7f1e260f-3694-49e8-b8d9-507ebc69b097",
            "properties": {
                "fo:color": "#333333",
                "svg:fill": "none",
                "border-line-color": "none",
                "fo:text-align": "left",
                "fo:font-size": "18pt",
                "fo:font-weight": "600",
                "fo:font-style": "normal"
            }
        },
        "map": {
            "type": "map",
            "styleId": "2373fbb0-e0f3-40b0-9e80-36ca45940338",
            "properties": {
                "svg:fill": "#F4F9FA"
            }
        },
        "subTopic": {
            "type": "topic",
            "styleId": "11bf0584-d4fb-4b92-9236-6370c8bdf7c6",
            "properties": {
                "fo:color": "#333333",
                "fo:text-align": "left",
                "fo:font-size": "14pt"
            }
        },
        "summary": {
            "type": "summary",
            "styleId": "9adb296b-f02d-42dd-a3c7-8de89d56014b",
            "properties": {
                "line-color": "#FF5252",
                "line-width": "3"
            }
        },
        "summaryTopic": {
            "type": "topic",
            "styleId": "e46704cc-2a7c-4f34-9e12-8abbf06e4158",
            "properties": {
                "svg:fill": "#FF5252",
                "fo:font-weight": "600",
                "fo:font-style": "normal",
                "line-color": "#FF9595",
                "line-width": "3"
            }
        },
        "calloutTopic": {
            "type": "topic",
            "styleId": "c5ba5ede-19a0-4647-af28-1e350e5a0da1",
            "properties": {
                "svg:fill": "#FF5252",
                "fo:font-weight": "600",
                "fo:font-style": "normal",
                "fo:font-size": "13pt"
            }
        },
        "boundary": {
            "type": "boundary",
            "styleId": "c1549c3f-9487-4e3f-af1a-b59f20969a0e",
            "properties": {
                "svg:fill": "none",
                "line-color": "#FF5252",
                "fo:font-size": "13pt",
                "fo:color": "#F8F7F7",
                "fo:font-weight": "600",
                "fo:font-style": "normal"
            }
        },
        "floatingTopic": {
            "type": "topic",
            "styleId": "fcedfa51-a587-4369-a00a-46d05c22d60a",
            "properties": {
                "svg:fill": "#FF5252",
                "border-line-width": "0",
                "line-color": "#FF9595"
            }
        },
        "relationship": {
            "type": "relationship",
            "styleId": "f9fd6ede-456b-49f1-8596-3a4740fdefee",
            "properties": {
                "line-color": "#FF5252",
                "fo:font-size": "13pt",
                "fo:color": "#FF5252",
                "fo:font-weight": "600",
                "fo:font-style": "normal"
            }
        }
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
        ;((topicObject.children || {}).attached || []).forEach(walk)
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
