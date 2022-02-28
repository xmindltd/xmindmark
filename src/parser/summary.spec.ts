import { createMapByM3 } from './mindmark'
import { strictEqual } from 'assert'

describe('4.1 - Summary', () => {

    it('Basic Summary', () => {
        let map = createMapByM3(`

central topic

* topic 1 [S]
* topic 2 [S]
[S] summary topic

        `)

        let summaryTopic = map.rootTopic.children.summary[0]
        strictEqual('summary topic', summaryTopic.title)
        let summary = map.rootTopic.summaries[0]
        strictEqual('(0,1)', summary.range)
        strictEqual(summaryTopic.id, summary.topicId)

    })

    it('Summary with numbers', () => {
        let map = createMapByM3(`

central topic

- topic
    * topic 1 [S2]
    * topic 2 [S2]
    [S2] summary topic 2

        `)

        let parent = map.rootTopic.children.attached[0]
        let summaryTopic = parent.children.summary[0]
        strictEqual('summary topic 2', summaryTopic.title)
        let summary = parent.summaries[0]
        strictEqual('(0,1)', summary.range)
        strictEqual(summaryTopic.id, summary.topicId)
    })

    it('Multi Boundaries', () => {
        let map = createMapByM3(`

central topic

* topic 1 [S1]
* topic 2 [S2]
[S2] title 2
[S1] title 1

        `)

        /// S1
        let summaryTopic = map.rootTopic.children.summary[0]
        strictEqual('title 1', summaryTopic.title)
        let summary = map.rootTopic.summaries[0]
        strictEqual('(0,0)', summary.range)
        strictEqual(summaryTopic.id, summary.topicId)

        /// S2
        summaryTopic = map.rootTopic.children.summary[1]
        strictEqual('title 2', summaryTopic.title)
        summary = map.rootTopic.summaries[1]
        strictEqual('(1,1)', summary.range)
        strictEqual(summaryTopic.id, summary.topicId)

    })

})

describe('4.2 - Summary topic has subtopics', () => {

    it('Subtopics', () => {
        let map = createMapByM3(`

central topic

* topic 1 [S]
* topic 2 [S]
[S] summary topic
    - subtopic 1
    - subtopic 2

        `)

        let summaryTopic = map.rootTopic.children.summary[0]
        strictEqual('summary topic', summaryTopic.title)
        strictEqual('subtopic 1', summaryTopic.children.attached[0].title)
        strictEqual('subtopic 2', summaryTopic.children.attached[1].title)

        let summary = map.rootTopic.summaries[0]
        strictEqual('(0,1)', summary.range)
        strictEqual(summaryTopic.id, summary.topicId)


    })
})
