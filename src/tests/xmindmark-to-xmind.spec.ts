import { ensureFileSync, readFileSync, removeSync } from 'fs-extra'
import { join } from 'path'
import { parseXMindMarkToXMindFile } from '../lib/xmindmark-to-xmind'
import JSZip from 'jszip'
import { notEqual } from 'assert'
import { assertSchema, ContentJSONSchema } from './schema'
import { writeFileSync } from 'fs'

const xmindMarkFileName = `sample.xmindmark`
const xmindMarkFilePath = join(__dirname, xmindMarkFileName)
const xmindMarkFileContent = `Central Topic\n- Main Topic 1\n`
const zip = new JSZip()

describe('XMindMark: Export as XMind file', async () => {
  before(() => {
    ensureFileSync(xmindMarkFilePath)
    writeFileSync(xmindMarkFilePath, xmindMarkFileContent)
  })
  after(() => {
    removeSync(xmindMarkFilePath)
  })

  it('giving a valid .xmindmark file content, generate a valid xmind file', async () => {
    const xmindMarkContent = readFileSync(xmindMarkFilePath, 'utf-8')
    const xmindArrayBuffer = await parseXMindMarkToXMindFile(xmindMarkContent)
    const xmindZip = await zip.loadAsync(xmindArrayBuffer)
    const contentJSONString = await xmindZip.file('content.json')?.async('string')

    notEqual(contentJSONString, null)

    const contentJSON = JSON.parse(contentJSONString!)
    assertSchema(contentJSON, ContentJSONSchema, { allowUnknown: true })
  })
})
