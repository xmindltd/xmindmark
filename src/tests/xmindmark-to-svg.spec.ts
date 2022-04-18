import { expect } from 'chai'
import { ensureFileSync, removeSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import { parseXMindMarkToSVGFile } from '../lib/xmindmark-to-svg'

const xmindMarkFileName = `sample.xmindmark`
const xmindMarkFilePath = join(__dirname, xmindMarkFileName)
const xmindMarkFileContent = `Central Topic\n- Main Topic 1\n`

describe('XMindMark: convert to svg', () => {
  before(() => {
    ensureFileSync(xmindMarkFilePath)
    writeFileSync(xmindMarkFilePath, xmindMarkFileContent)
  })
  after(() => {
    removeSync(xmindMarkFilePath)
  })
  
  it('can parsed XMindMark content to svg file', async () => {
    let browserMakerFnCalled = false
    let svgConverterFnCalled = false
    let afterConvertionFnCalled = false
    
    const outputSVGContent = await parseXMindMarkToSVGFile(xmindMarkFileContent, {
      browserMaker: () => {
        browserMakerFnCalled = true
        return Promise.resolve({} as any)
      },
      svgConverter: () => {
        svgConverterFnCalled = true
        return Promise.resolve(xmindMarkFileContent)
      },
      afterConvertion: () => {
        afterConvertionFnCalled = true
        return Promise.resolve()
      }
    })

    expect(browserMakerFnCalled).to.be.true
    expect(svgConverterFnCalled).to.be.true
    expect(afterConvertionFnCalled).to.be.true
    expect(new TextDecoder().decode(outputSVGContent, )).to.equal(xmindMarkFileContent)
  })
})
