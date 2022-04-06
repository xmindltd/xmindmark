import { readFileSync } from 'fs'
import { pathExistsSync, writeFile } from 'fs-extra'
import { join, parse } from 'path'
import { resolve } from 'path'
import { Readable } from 'stream'
import { parseXMindMarkToXMindFile } from '../lib/xmindmark-to-xmind'
import { convertToSVGByBrowser, getBrowserInstance, parseXMindMarkToSVGFile } from '../lib/xmindmark-to-svg'
import { getFileNameFromContent, readStringFromStream, SUPPORT_FORMAT } from '../utils'

export type ConverterFn = (xmindMarkFileContent: string) => Promise<ArrayBuffer>

export type Convertion = {
  xmindMarkFilePath?: string
  xmindMarkReadableStream?: Readable
  outputDir: string
  outputFormat: SUPPORT_FORMAT
  converter: ConverterFn
}

export const xmindConverter: ConverterFn = async (xmindMarkFileContent) => await parseXMindMarkToXMindFile(xmindMarkFileContent)

export const svgConverter: ConverterFn = async (xmindMarkFilePath) => await parseXMindMarkToSVGFile(xmindMarkFilePath, {
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
  const tasks = payloads.map(({ xmindMarkFilePath, xmindMarkReadableStream, outputDir, outputFormat, converter }) => {
    return (async () => {
      let xmindMarkFileContent: string
  
      if (xmindMarkFilePath) {
        if (!pathExistsSync(xmindMarkFilePath)) {
          console.error(`Can not resolve file ${resolve(xmindMarkFilePath)}`)
          return
        }
        xmindMarkFileContent = readFileSync(xmindMarkFilePath, 'utf-8')
      } else if (xmindMarkReadableStream) {
        xmindMarkFileContent = await readStringFromStream(xmindMarkReadableStream)
      } else {
        throw new Error(`One of 'xmindMarkFilePath' and 'xmindMarkReadableStream' must be passed`)
      }
  
      const buffer = await converter(xmindMarkFileContent)
      const xmindMarkFileName = xmindMarkFilePath ? parse(xmindMarkFilePath).name : getFileNameFromContent(xmindMarkFileContent)
      const outputFilePath = join(outputDir, `${xmindMarkFileName}.${outputFormat}`)
      
      if (outputFilePath && pathExistsSync(outputFilePath)) {
        console.warn(`The file to be exported (${outputFilePath}) is exist, conversion has been skipped.`)
        return
      }
  
      await writeFile(outputFilePath, Buffer.from(buffer))
    })()
  })

  await Promise.all(tasks)
}
