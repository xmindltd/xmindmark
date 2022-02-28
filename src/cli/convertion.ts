import { readFileSync } from 'fs'
import { pathExistsSync, writeFile } from 'fs-extra'
import { join, parse } from 'path'
import { resolve } from 'path/posix'
import { Readable } from 'stream'
import { parseM3ToXMindFile } from '../lib/m3-to-xmind'
import { convertToSVGByBrowser, getBrowserInstance, parseM3ToSVGFile } from '../lib/m3-to-svg'
import { getFileNameFromContent, readStringFromStream, SUPPORT_FORMAT } from '../utils'

export type ConverterFn = (m3FileContent: string) => Promise<ArrayBuffer>

export type Convertion = {
  m3FilePath?: string
  m3ReadableStream?: Readable
  outputDir: string
  outputFormat: SUPPORT_FORMAT
  converter: ConverterFn
}

export const xmindConverter: ConverterFn = async (m3FileContent) => await parseM3ToXMindFile(m3FileContent)

export const svgConverter: ConverterFn = async (m3FilePath) => await parseM3ToSVGFile(m3FilePath, {
  browserMaker: getBrowserInstance,
  svgConverter: convertToSVGByBrowser,
  afterConvertion: async (browser) => await browser.close()
})

export const getConverterByFormat = (format: SUPPORT_FORMAT): ConverterFn => {
  switch (format) {
    case SUPPORT_FORMAT.XMIND: return xmindConverter
    case SUPPORT_FORMAT.SVG: return svgConverter
    default: return xmindConverter
  }
}

export async function convert(payloads: Convertion[]) {
  const tasks = payloads.map(({ m3FilePath, m3ReadableStream, outputDir, outputFormat, converter }) => {
    return (async () => {
      let m3FileContent: string
  
      if (m3FilePath) {
        if (!pathExistsSync(m3FilePath)) {
          console.error(`Can not resolve file ${resolve(m3FilePath)}`)
          return
        }
        m3FileContent = readFileSync(m3FilePath, 'utf-8')
      } else if (m3ReadableStream) {
        m3FileContent = await readStringFromStream(m3ReadableStream)
      } else {
        throw new Error(`One of 'm3FilePath' and 'm3ReadableStream' must be passed`)
      }
  
      const buffer = await converter(m3FileContent)
      const m3FileName = m3FilePath ? parse(m3FilePath).name : getFileNameFromContent(m3FileContent)
      const outputFilePath = join(outputDir, `${m3FileName}.${outputFormat}`)
      
      if (outputFilePath && pathExistsSync(outputFilePath)) {
        console.warn(`The file to be exported (${outputFilePath}) is exist, conversion has been skipped.`)
        return
      }
  
      await writeFile(outputFilePath, Buffer.from(buffer))
    })()
  })

  await Promise.all(tasks)
}
