import { ensureDirSync, readdirSync } from 'fs-extra'
import { chromiumCacheDir } from '../config'
import puppeteer, { BrowserFetcher, Platform, Browser } from 'puppeteer-core'
import { getMetaInfo, getPuppeteerPlatform, META_KEY, updateMetaFile } from '../utils'
import { PUPPETEER_REVISIONS } from 'puppeteer-core/lib/cjs/puppeteer/revisions'

export function isBrowserFileReady(): boolean {
  ensureDirSync(chromiumCacheDir)
  return readdirSync(chromiumCacheDir).length > 0
}

// shims: createBrowserFetcher() not exist in puppeteer-core
const createBrowserFetcher = (
  options: { host?: string, path?: string, platform?: Platform }
): BrowserFetcher => (puppeteer as any).createBrowserFetcher(options)

export async function downloadBrowserFile(): Promise<void> {
  console.log('Downloading chromium ...')
  const fetcher = createBrowserFetcher({ path: chromiumCacheDir, platform: getPuppeteerPlatform() })
  // https://github.com/puppeteer/puppeteer/#q-which-chromium-version-does-puppeteer-use
  const revisionInfo = await fetcher.download(PUPPETEER_REVISIONS.chromium)
  updateMetaFile({
    [META_KEY.CHROMIUM_EXECUTABLE_PATH]: revisionInfo.executablePath,
    [META_KEY.CHROMIUM_REVISION]: revisionInfo.revision
  })
  console.log('Done.')
}

export async function initBrowser(): Promise<Browser> {
  if (!isBrowserFileReady()) {
    console.log('Browser environment is not detected, initializing...')
    await downloadBrowserFile()
  }
  const executablePath = getMetaInfo(META_KEY.CHROMIUM_EXECUTABLE_PATH)
  return await puppeteer.launch({ executablePath, headless: true })
}
