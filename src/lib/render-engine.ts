import { ensureFileSync, existsSync, readFileSync, writeFile } from 'fs-extra'
import { request } from 'https'
import { renderEngineCacheFile, renderEngineDownloadUrl } from '../config'

export function isRenderEngineFileReady(): boolean {
  return existsSync(renderEngineCacheFile)
}

export async function downloadRenderEngineFile(): Promise<void> {
  const content = await new Promise((resolve, reject) => {
    const req = request(renderEngineDownloadUrl, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => resolve(data))
    })
    req.on('error', (err) => reject(err))
    req.end()
  })
  ensureFileSync(renderEngineCacheFile)
  await writeFile(renderEngineCacheFile, content)
}

export function getRenderEngineFile(): string {
  return readFileSync(renderEngineCacheFile, 'utf-8')
}

/**
 * check local snowbrush bundle file and execute in the browser instance passed in
 */
export async function initRenderEngine(): Promise<string> {
  if (!isRenderEngineFileReady()) {
    console.log('Mind map render engine is not detected, initializing...')
    await downloadRenderEngineFile()
    console.log('Done.')
  }

  return getRenderEngineFile()
}