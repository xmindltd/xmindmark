import { Browser } from 'puppeteer-core'
import { createMapByM3 } from '../parser/mindmark'
import { initBrowser } from './browser'
import { initRenderEngine } from './render-engine'

const sbScriptBuilder = {
  initMap: (map: unknown) => `
const CONTAINER_ID = 'mindmap-container'
const container = document.createElement('div')
container.id = CONTAINER_ID
document.body.appendChild(container)

window.sb = new Snowbrush.SheetEditor({
  el: document.getElementById(CONTAINER_ID),
  model: new Snowbrush.Model.Sheet(${JSON.stringify(map)})
})`,
  loadMapAsync: () => `
new Promise((resolve) => {
  window.sb.on('SHEET_CONTENT_LOADED', () => resolve(true))
  sb.initInnerView()
})`,
  exportSvg: () => `sb.exportImage({ format: 'SVG', skipFont: false }).then(res => res.data)`
}

export async function parseM3ToSVGFile(
  m3FileContent: string,
  executor: {
    browserMaker: () => Promise<Browser>,
    svgConverter: (browser: Browser, m3FileContent: string) => Promise<string>,
    afterConvertion?: (browser: Browser) => Promise<void>
  }
): Promise<ArrayBuffer> {
  const browser = await executor.browserMaker()
  const svg = await executor.svgConverter(browser, m3FileContent)
  executor.afterConvertion?.(browser)

  return new TextEncoder().encode(svg)
}

let browser: Browser

export async function getBrowserInstance(): Promise<Browser> {
  if (!browser) {
    browser = await initBrowser()
  }

  return browser
}

export async function convertToSVGByBrowser(browser: Browser, m3FileContent: string): Promise<string> {
  const sheetmodel = createMapByM3(m3FileContent)
  const renderEngineFile = await initRenderEngine()

  const page = await browser.newPage()
  await page.addScriptTag({ content: renderEngineFile }) // load render engine
  await page.evaluate(sbScriptBuilder.initMap(sheetmodel)) // render the real map
  await page.waitForFunction(sbScriptBuilder.loadMapAsync()) // wait for render process finished

  return await page.evaluate(sbScriptBuilder.exportSvg()) // call API of render engine for exporting
}
