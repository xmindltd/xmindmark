import { parseXMindMarkToXMindFile } from '../../src'
import { downloadFile, loadFileAsText } from './loader'
import { renderMapByString } from './map'

let openedFileName: string = ''

function initRenderEngine() {
  const result = document.getElementById('result') as HTMLDivElement
  const convert = document.getElementById('convert') as HTMLButtonElement

  result.classList.add('loading')
  convert.classList.add('loading')

  window.addEventListener('load', () => {
    result.classList.remove('loading')
    convert.classList.remove('loading')
  
    const existContent = globalThis.editor?.getValue() ?? ''
    if (existContent.length > 0) {
      renderMapByString(existContent)
    }
  })
}

function initEditor() {
  const input = document.getElementById('input') as HTMLDivElement
  input.classList.add('loading')
  
  window.addEventListener('load', () => {
    globalThis.editor = globalThis.monaco.editor.create(input, {
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

    input.classList.remove('loading')
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
      const content = globalThis.editor?.getValue() ?? ''
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
      globalThis.editor.setValue(result)
      renderMapByString(result)
      input.classList.remove('loading')
      fileSelect.files = null
    }
  })

  convert.addEventListener('click', async () => {
    const content = globalThis.editor?.getValue() ?? ''
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