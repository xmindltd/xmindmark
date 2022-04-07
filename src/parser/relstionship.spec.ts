import { createMapByXMindMark } from './mindmark'
import { strictEqual } from 'assert'

describe('1.1 - Basic tests for Central Topics', () => {

    it('Only Central Topic', () => {
        let map = createMapByXMindMark(`

only central topic

`)
        strictEqual('only central topic', map.rootTopic.title)
    })

    it('Indented Central Topic', () => {
        let map = createMapByXMindMark(`

    \tindented central topic

`)
        strictEqual('indented central topic', map.rootTopic.title)
    })

})

describe('1.2 - Basic tests for Main Topics', () => {

    it('2 Main Topics', () => {
        let map = createMapByXMindMark(`

central topic
- main topic 1
- main topic 2

`)
        strictEqual('central topic', map.rootTopic.title)
        let attachedMainTopics = map.rootTopic.children.attached
        strictEqual('main topic 1', attachedMainTopics[0].title)
        strictEqual('main topic 2', attachedMainTopics[1].title)
    })

    it('2 Main Topics with empty line', () => {
        let map = createMapByXMindMark(`

central topic

- main topic 1

- main topic 2

`)
        strictEqual('central topic', map.rootTopic.title)
        let attachedMainTopics = map.rootTopic.children.attached
        strictEqual('main topic 1', attachedMainTopics[0].title)
        strictEqual('main topic 2', attachedMainTopics[1].title)
    })

    it('2 Main Topics with *', () => {
        let map = createMapByXMindMark(`

central topic

* main topic 1
* main topic 2

`)
        strictEqual('central topic', map.rootTopic.title)
        let attachedMainTopics = map.rootTopic.children.attached
        strictEqual('main topic 1', attachedMainTopics[0].title)
        strictEqual('main topic 2', attachedMainTopics[1].title)
    })

    it('2 Main Topics with different indicator', () => {
        let map = createMapByXMindMark(`

central topic

- main topic 1
* main topic 2

`)
        strictEqual('central topic', map.rootTopic.title)
        let attachedMainTopics = map.rootTopic.children.attached
        strictEqual('main topic 1', attachedMainTopics[0].title)
        strictEqual('main topic 2', attachedMainTopics[1].title)
    })

})

describe('1.3 - Basic tests for more levels of topics', () => {

    it('2 Main Topics with different indicator', () => {
        let map = createMapByXMindMark(`

Central Topic

- Main Topic 1

- Main Topic 2
    * Subtopic 2.1
    * Subtopic 2.2

- Main Topic 3
    * Subtopic 3.1
        - Subtopic 3.1.1
        - Subtopic 3.1.2
    * Subtopic 3.2
        
`)
        let mainTopics = map.rootTopic.children.attached
        strictEqual('Main Topic 1', mainTopics[0].title)
        
        strictEqual('Main Topic 2', mainTopics[1].title)
        let subtopics = mainTopics[1].children.attached
        strictEqual('Subtopic 2.1', subtopics[0].title)
        strictEqual('Subtopic 2.2', subtopics[1].title)

        strictEqual('Main Topic 3', mainTopics[2].title)
        subtopics = mainTopics[2].children.attached
        strictEqual('Subtopic 3.1', subtopics[0].title)
        strictEqual('Subtopic 3.2', subtopics[1].title)

        subtopics = subtopics[0].children.attached
        strictEqual('Subtopic 3.1.1', subtopics[0].title)
        strictEqual('Subtopic 3.1.2', subtopics[1].title)
    })

})
