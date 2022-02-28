import { ensureFileSync, readFileSync, removeSync } from 'fs-extra'
import { join } from 'path'
import { parseM3ToXMindFile } from '../lib/m3-to-xmind'
import JSZip from 'jszip'
import { notEqual } from 'assert'
import { assertSchema, ContentJSONSchema } from './schema'
import { writeFileSync } from 'fs'

const m3FileName = `sample.m3`
const m3FilePath = join(__dirname, m3FileName)
const m3FileContent = `Central Topic\n- Main Topic 1\n`
const zip = new JSZip()

describe('M3: Export as XMind file', async () => {
  before(() => {
    ensureFileSync(m3FilePath)
    writeFileSync(m3FilePath, m3FileContent)
  })
  after(() => {
    removeSync(m3FilePath)
  })

  it('giving a valid .m3 file content, generate a valid xmind file', async () => {
    const m3Content = readFileSync(m3FilePath, 'utf-8')
    const xmindArrayBuffer = await parseM3ToXMindFile(m3Content)
    const xmindZip = await zip.loadAsync(xmindArrayBuffer)
    const contentJSONString = await xmindZip.file('content.json')?.async('string')

    notEqual(contentJSONString, null)

    const contentJSON = JSON.parse(contentJSONString!)
    assertSchema(contentJSON, ContentJSONSchema, { allowUnknown: true })
  })
})
