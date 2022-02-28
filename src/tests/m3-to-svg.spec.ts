import { expect } from 'chai'
import { ensureFileSync, readFileSync, removeSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import { parseM3ToSVGFile } from '../lib/m3-to-svg'

const m3FileName = `sample.m3`
const m3FilePath = join(__dirname, m3FileName)
const m3FileContent = `Central Topic\n- Main Topic 1\n`

describe('M3: convert to svg', () => {
  before(() => {
    ensureFileSync(m3FilePath)
    writeFileSync(m3FilePath, m3FileContent)
  })
  after(() => {
    removeSync(m3FilePath)
  })
  
  it('can parsed M3 content to svg file', async () => {
    let browserMakerFnCalled = false
    let svgConverterFnCalled = false
    let afterConvertionFnCalled = false
    
    const outputSVGContent = await parseM3ToSVGFile(m3FileContent, {
      browserMaker: () => {
        browserMakerFnCalled = true
        return Promise.resolve({} as any)
      },
      svgConverter: () => {
        svgConverterFnCalled = true
        return Promise.resolve(m3FileContent)
      },
      afterConvertion: () => {
        afterConvertionFnCalled = true
        return Promise.resolve()
      }
    })

    expect(browserMakerFnCalled).to.be.true
    expect(svgConverterFnCalled).to.be.true
    expect(afterConvertionFnCalled).to.be.true
    expect(new TextDecoder().decode(outputSVGContent, )).to.equal(m3FileContent)
  })
})
