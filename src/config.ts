import { join } from 'path'

export const cacheDir = join(__dirname, '..', '.cache')
export const chromiumCacheDir = join(cacheDir, '.chromium')
export const renderEngineCacheDir = join(cacheDir, '.snowbrush')
export const renderEngineCacheFile = join(renderEngineCacheDir, 'snowbrush-latest.js')
export const renderEngineDownloadUrl = `https://assets.xmind.net/snowbrush/snowbrush-latest.js`
export const metaCacheFile = join(cacheDir, 'meta.json')
