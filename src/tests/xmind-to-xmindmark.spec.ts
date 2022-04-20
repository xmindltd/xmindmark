import { parseXMindToXMindMarkFile } from '../lib/xmind-to-xmindmark'
import chai from 'chai'
import JSZip from 'jszip'
import { beforeEach } from 'mocha'
import { expect } from 'chai'
import { readFileSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import chaiAsPromised from 'chai-as-promised'

let sampleFile: ArrayBuffer
const sampleJSON = {}
chai.use(chaiAsPromised)

describe('XMindMark: form .xmind file', () => {
  beforeEach(async () => {
    // const zip = new JSZip()
    // sampleFile = await zip.file('content.json', JSON.stringify(sampleJSON))
    //   .generateAsync({ type: 'arraybuffer', compression: 'STORE' })

    sampleFile = readFileSync(join(__dirname, 'SDtodos.xmind'))
  })
  
  it('can convert .xmind file to XMindMark content', async () => {
    const output = await parseXMindToXMindMarkFile(sampleFile)
    writeFileSync(join(__dirname, 'output.xmindmark'), output)
    const expectedOutput = ``
    expect(output).to.deep.equal(expectedOutput)
  })
})
