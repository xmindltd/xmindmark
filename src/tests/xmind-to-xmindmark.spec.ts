import { parseXMindToXMindMarkFile } from '../lib/xmind-to-xmindmark'
import JSZip from 'jszip'
import { beforeEach } from 'mocha'
import { expect } from 'chai'

let sampleFile: ArrayBuffer
const sampleJSON = {}

describe('XMindMark: form .xmind file', () => {
  beforeEach(async () => {
    const zip = new JSZip()
    sampleFile = await zip.file('content.json', JSON.stringify(sampleJSON))
      .generateAsync({ type: 'arraybuffer', compression: 'STORE' })
  })
  
  it('can convert .xmind file to XMindMark content', () => {
    const output = parseXMindToXMindMarkFile(sampleFile)
    const expectedOutput = ``
    expect(output).to.deep.equal(expectedOutput)
  })
})
