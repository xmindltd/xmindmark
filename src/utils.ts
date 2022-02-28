import { ensureFileSync, fstat, readFileSync, writeFileSync } from 'fs-extra'
import { metaCacheFile } from './config'
import { Platform } from 'puppeteer-core'
import packageJSON from '../package.json'
import { Readable } from 'stream'

export enum SUPPORT_FORMAT {
  XMIND = 'xmind',
  SVG = 'svg'
}

export enum META_KEY {
  CHROMIUM_EXECUTABLE_PATH = 'CHROMIUM_EXECUTABLE_PATH',
  CHROMIUM_REVISION = 'CHROMIUM_REVISION'
}

export type Meta = {
  [META_KEY.CHROMIUM_EXECUTABLE_PATH]?: string,
  [META_KEY.CHROMIUM_REVISION]?: string
}

let memoryMeta: Meta

export function getPuppeteerPlatform(): Platform {
  const { platform, arch } = process

  if (platform === 'darwin') return 'mac'
  if (platform === 'win32') {
    return arch === 'x64' ? 'win64' : 'win32'
  }
  return 'linux'
}

export function initMeta() {
  if (!memoryMeta) {
    try {
      ensureFileSync(metaCacheFile)
      memoryMeta = JSON.parse(readFileSync(metaCacheFile, 'utf-8'))
    } catch (e) {
      memoryMeta = {}
    }
  }
}

export function updateMetaFile(newMeta: Partial<Meta>) {
  if (!memoryMeta) initMeta()
  
  memoryMeta = {
    ...memoryMeta,
    ...newMeta
  }
  writeFileSync(metaCacheFile, JSON.stringify(memoryMeta))
}

export function getMetaInfo(key: META_KEY) {
  if (!memoryMeta) initMeta()
  
  return memoryMeta[key]
}

// See: https://stackoverflow.com/a/59024214
// About file descriptor: https://en.wikipedia.org/wiki/File_descriptor
export async function hasContentPipedIn(): Promise<boolean> {
  return new Promise((resolve) => {
    fstat(0, (err, stats) => err ? resolve(false) : resolve(stats.isFIFO()))
  })
}

export function getFileNameFromContent(content: string): string {
  const lineBreakPos = content.split('\n')[0].length

  return content.slice(0, Math.min(Math.max(0, lineBreakPos), 20)).trim()
}

export async function readStringFromStream(stream: Readable): Promise<string> {
  const data: Buffer[] = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => data.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(data).toString('utf-8')))
  })
}

export function unexpedtedError(msg?: string) {
  console.error(msg ?? `
Unexpected error occured, you can run

  m3 reset

to clear the dependencies cache of M3, then try

  ${['m3', ...process.argv.slice(2)].join(' ')}

again. If it still happens, please report issue at: ${packageJSON.bugs.url}`) 
}
