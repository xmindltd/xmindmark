import { createMapByXMindMark } from '../parser/mindmark'
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

export async function parseXMindMarkToXMindFile(xmindMarkFileContent: string): Promise<ArrayBuffer> {
  const sheetModel = createMapByXMindMark(xmindMarkFileContent)
  const xmindFolder = {
    'content.json': createContentJson(sheetModel),
    'manifest.json': createManifestJson(),
    'metadata.json': createMetadataJson()
  }

  return await Object.entries(xmindFolder)
    .reduce((zip, [filename, content]) => zip.file(filename, content), new JSZip())
    .generateAsync({ type: 'arraybuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } })
}
