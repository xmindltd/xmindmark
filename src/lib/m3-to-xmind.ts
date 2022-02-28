import { createMapByM3 } from '../parser/mindmark'
import JSZip from 'jszip'
import { SheetModel } from '../types'

function createContentJson(...maps: SheetModel[]) {
  return JSON.stringify([...maps])
}

function createManifestJson() {
  return JSON.stringify({
    "file-entries": {
      "content.json": {},
      "metadata.json": {}
    }
  })
}

function createMetadataJson() {
  return JSON.stringify({})
}

export async function parseM3ToXMindFile(m3Content: string): Promise<ArrayBuffer> {
  const sheetModel = createMapByM3(m3Content)
  const xmindFolder = {
    'content.json': createContentJson(sheetModel),
    'manifest.json': createManifestJson(),
    'metadata.json': createMetadataJson()
  }

  return await Object.entries(xmindFolder)
    .reduce((zip, [filename, content]) => zip.file(filename, content), new JSZip())
    .generateAsync({ type: 'arraybuffer', compression: 'STORE' })
}
