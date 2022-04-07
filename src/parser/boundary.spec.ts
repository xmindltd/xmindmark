import { createMapByXMindMark } from './mindmark'
import { strictEqual } from 'assert'

describe('3.1 - Boundary', () => {

    it('Basic Boundary', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B]
* topic 2 [B]

        `)

        let boundary = map.rootTopic.boundaries[0]
        strictEqual('(0,1)', boundary.range)
    })

    it('Boundary with numbers', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B1]

        `)

        let boundary = map.rootTopic.boundaries[0]
        strictEqual('(0,1)', boundary.range)
    })

    it('Multi Boundaries', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B2]

        `)

        let boundary = map.rootTopic.boundaries[0]
        strictEqual('(0,0)', boundary.range)
        boundary = map.rootTopic.boundaries[1]
        strictEqual('(1,1)', boundary.range)
    })

})

describe('3.2 - Boundary with Title', () => {

    it('Basic Boundary', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B]
* topic 2 [B]
[B] title 1

        `)

        let boundary = map.rootTopic.boundaries[0]
        strictEqual('(0,1)', boundary.range)
        strictEqual('title 1', boundary.title)
    })

    it('Boundary with numbers', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B1]
[B1] title 2

        `)

        let boundary = map.rootTopic.boundaries[0]
        strictEqual('(0,1)', boundary.range)
        strictEqual('title 2', boundary.title)
    })

    it('Multi Boundaries', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1 [B1]
* topic 2 [B2]
[B2] title 2
[B1] title 1

        `)

        let boundary = map.rootTopic.boundaries[0]
        strictEqual('(0,0)', boundary.range)
        strictEqual('title 1', boundary.title)
        boundary = map.rootTopic.boundaries[1]
        strictEqual('(1,1)', boundary.range)
        strictEqual('title 2', boundary.title)
    })

    it('Boundaries with subtopics', () => {
        let map = createMapByXMindMark(`

central topic

* topic 1
    * topic 1.1 [B]
    * topic 1.2 [B]
    [B] title 1

        `)

        let topic = map.rootTopic.children.attached[0]
        let boundary = topic.boundaries[0]
        strictEqual('(0,1)', boundary.range)
        strictEqual('title 1', boundary.title)
    })

})
