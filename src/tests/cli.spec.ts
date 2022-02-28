import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { existsSync, readdirSync, removeSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import { getFileNameFromContent, SUPPORT_FORMAT } from '../utils'
import { ensureTempFileDirExist, makeReadableStringStream, tempFileDirForTest } from './utils'
import { convert, getConverterByFormat, xmindConverter, svgConverter, ConverterFn, Convertion } from '../cli/convertion'

chai.use(chaiAsPromised)

const expect = chai.expect

const sampleFileName = 'sample'
const sampleFilePath = join(tempFileDirForTest, sampleFileName)
const sampleFileContent = 'Central topic'

const ensureSampleM3File = () => writeFileSync(sampleFilePath, sampleFileContent)
const clearTempFiles = () => removeSync(tempFileDirForTest)

describe('CLI functions', () => {
  beforeEach(() => {
    ensureTempFileDirExist()
    ensureSampleM3File()
  })

  afterEach(() => {
    clearTempFiles()
  })

  it('Convertion: select correct converter function by target format', () => {
    expect(getConverterByFormat(SUPPORT_FORMAT.XMIND)).to.be.equal(xmindConverter)
    expect(getConverterByFormat(SUPPORT_FORMAT.SVG)).to.be.equal(svgConverter)
  })

  it('Convertion: call converter function correctly', async () => {
    let xmindConverterCalledCount: number = 0
    let svgConverterCalledCount: number = 0
    const fakeXMindConverter: ConverterFn = (_) => new Promise((resolve) => {
      xmindConverterCalledCount += 1
      resolve(new ArrayBuffer(0))
    })
    const fakeSvgConverter: ConverterFn = (_) => new Promise((resolve) => {
      svgConverterCalledCount += 1
      resolve(new ArrayBuffer(0))
    })
    
    const xmindConvertion: Convertion = {
      m3FilePath: sampleFilePath,
      outputDir: tempFileDirForTest,
      outputFormat: SUPPORT_FORMAT.XMIND,
      converter: fakeXMindConverter
    }

    const svgConvertion: Convertion = {
      m3FilePath: sampleFilePath,
      outputDir: tempFileDirForTest,
      outputFormat: SUPPORT_FORMAT.SVG,
      converter: fakeSvgConverter
    }

    const streamConvertion: Convertion = {
      m3ReadableStream: makeReadableStringStream(sampleFileContent),
      outputDir: tempFileDirForTest,
      outputFormat: SUPPORT_FORMAT.XMIND,
      converter: fakeXMindConverter
    }

    const expectOutputFileNames = [
      `${sampleFileName}.${SUPPORT_FORMAT.SVG}`,
      `${sampleFileName}.${SUPPORT_FORMAT.XMIND}`,
      `${getFileNameFromContent(sampleFileContent)}.${SUPPORT_FORMAT.XMIND}`
    ]

    await convert([xmindConvertion, svgConvertion, streamConvertion])
    const fileList = readdirSync(tempFileDirForTest)
    expect(xmindConverterCalledCount).to.be.equal(2)
    expect(svgConverterCalledCount).to.be.equal(1)
    expect(fileList).to.include.members(expectOutputFileNames)
  })

  it('Convertion: throws when no pass any input source', () => {
    const convertionWithoutAnyInput: Convertion = {
      outputDir: tempFileDirForTest,
      outputFormat: SUPPORT_FORMAT.XMIND,
      converter: () => Promise.resolve() as any
    }

    expect(convert([convertionWithoutAnyInput])).to.eventually.rejectedWith('must be passed')
  })
})
