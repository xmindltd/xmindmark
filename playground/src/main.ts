import { parseXMindMarkToXMindFile } from '../../src'
import { downloadFile, loadFileAsText } from './loader'
import { loadExternalScript } from './loader'
import { renderMapByString } from './map'
import * as monaco from 'monaco-editor'

let openedFileName: string = ''
let editor: monaco.editor.IStandaloneCodeEditor

const renderEngineDownloadUrl = 'https://assets.xmind.net/snowbrush/snowbrush-2.47.0.js'

function initRenderEngine() {
  const result = document.getElementById('result') as HTMLDivElement
  const convert = document.getElementById('convert') as HTMLButtonElement

  result.classList.add('loading')
  convert.classList.add('loading')

  loadExternalScript(renderEngineDownloadUrl).then(() => {
    result.classList.remove('loading')
    convert.classList.remove('loading')

    const existContent = editor.getValue()
    if (existContent.length > 0) {
      renderMapByString(existContent)
    }
  })

  return
}

function initEditor() {
  const input = document.getElementById('input') as HTMLDivElement
  
  editor = monaco.editor.create(input, {
    language: 'markdown',
    wordWrap: 'on',
    minimap: { enabled: false },
    fontSize: 16,
    // hide gutter aside line number
    lineNumbers: 'on',
    lineDecorationsWidth: 6,
    lineNumbersMinChars: 0,
    folding: false,
    // hide vertical line of ruler
    overviewRulerBorder: false,
  })

  window.addEventListener('resize', () => {
    const { width, height } = input.getBoundingClientRect()
    input.style.setProperty('width', `${width}px`)
    input.style.setProperty('height', `${height}px`)
    editor.layout()
  })
}

function initView() {
  const fileSelect = document.getElementById('file-select') as HTMLInputElement
  const input = document.getElementById('input') as HTMLDivElement
  const convert = document.getElementById('convert') as HTMLButtonElement

  let timeoutToken: ReturnType<typeof setTimeout>

  input.addEventListener('keydown', (e) => {
    clearTimeout(timeoutToken)
    timeoutToken = setTimeout(() => {
      const content = editor.getValue()
      if (content.length > 0) {
        renderMapByString(content)
      }
    }, 500);
  })

  fileSelect.addEventListener('input', async () => {
    const file = fileSelect.files?.[0]
    if (file) {
      openedFileName = file.name.split('.')[0]
      input.classList.add('loading')

      const result = await loadFileAsText(file)
      editor.setValue(result)
      renderMapByString(result)
      input.classList.remove('loading')
      fileSelect.files = null
    }
  })

  convert.addEventListener('click', async () => {
    const content = editor.getValue()
    const arrayBuffer = await parseXMindMarkToXMindFile(content)
    const downloadFileName = openedFileName.length > 0 ? openedFileName : content.split('\n').map(str => str.trim()).filter(str => str.length > 0)[0]
    downloadFile(arrayBuffer, `${downloadFileName}.xmind`)
  })
}

function main() {
  initEditor()
  initRenderEngine()
  initView()
}

main()