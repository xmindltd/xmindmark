import { parseXMindToXMindMarkFile } from '../lib/xmind-to-xmindmark'
import chai from 'chai'
import JSZip from 'jszip'
import { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { expectedOutputXMindMark, inputJSON } from './xmind-to-xmindmark.sample'

chai.use(chaiAsPromised)

let sampleFile: ArrayBuffer

describe('XMindMark: form .xmind file', () => {
  beforeEach(async () => {
    const zip = new JSZip()
    sampleFile = await zip.file('content.json', JSON.stringify(inputJSON))
      .generateAsync({ type: 'arraybuffer', compression: 'STORE' })
  })
  
  it('can convert .xmind file to XMindMark content', async () => {
    const output = await parseXMindToXMindMarkFile(sampleFile)
    expect(output).to.deep.equal(expectedOutputXMindMark)
  })
})
