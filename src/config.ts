import { readFileSync } from 'fs-extra'
import { join } from 'path'

const pkgJSON = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))
export const version = pkgJSON.version
export const issueUrl = pkgJSON.bugs.url

export const cacheDir = join(__dirname, '..', '.cache')
export const chromiumCacheDir = join(cacheDir, '.chromium')
export const renderEngineCacheDir = join(cacheDir, '.snowbrush')
export const renderEngineCacheFile = join(renderEngineCacheDir, 'snowbrush.js')
export const renderEngineDownloadUrl = `https://assets.xmind.net/snowbrush/snowbrush-2.47.0.js`
export const metaCacheFile = join(cacheDir, 'meta.json')
