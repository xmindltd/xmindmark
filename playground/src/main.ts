import { parseXMindMarkToXMindFile } from '../../src'
import { createMapByXMindMark } from '../../src/parser/mindmark'
import { downloadFile, loadFileAsText } from './loader'
import { loadExternalScript } from './loader'
import { renderMapByString } from './map'

let openedFileName: string = ''

const renderEngineDownloadUrl = 'https://assets.xmind.net/snowbrush/snowbrush-2.47.0.js'

function initScript() {
  const result = document.getElementById('result') as HTMLDivElement
  const convert = document.getElementById('convert') as HTMLButtonElement
  const input = document.getElementById('input') as HTMLTextAreaElement

  result.classList.add('loading')
  convert.classList.add('loading')

  loadExternalScript(renderEngineDownloadUrl).then(() => {
    result.classList.remove('loading')
    convert.classList.remove('loading')

    if (input.value) {
      renderMapByString(input.value)
    }
  })

  return
}

function initView() {
  const fileSelect = document.getElementById('file-select') as HTMLInputElement
  const input = document.getElementById('input') as HTMLTextAreaElement
  const convert = document.getElementById('convert') as HTMLButtonElement

  let timeoutToken: ReturnType<typeof setTimeout>

  input.addEventListener('keydown', (e) => {
    // Allow input tab in textarea
    if (e.key === 'Tab') {
      e.preventDefault()
      const startPos = input.selectionStart
      input.value = input.value.substring(0, startPos) + '    ' + input.value.substring(input.selectionEnd)
      input.selectionStart = startPos + 4
    }

    clearTimeout(timeoutToken)
    timeoutToken = setTimeout(() => {
      if (input.value.length > 0) {
        renderMapByString(input.value)
      }
    }, 500);
  })

  fileSelect.addEventListener('input', async () => {
    const file = fileSelect.files?.[0]
    if (file) {
      openedFileName = file.name.split('.')[0]
      input.classList.add('loading')

      const result = await loadFileAsText(file)
      input.value = result
      renderMapByString(result)
      input.classList.remove('loading')
      fileSelect.files = null
    }
  })

  convert.addEventListener('click', async () => {
    const arrayBuffer = await parseXMindMarkToXMindFile(input.value)
    const downloadFileName = openedFileName.length > 0 ? openedFileName : input.value.split('\n').map(str => str.trim()).filter(str => str.length > 0)[0]
    downloadFile(arrayBuffer, `${downloadFileName}.xmind`)
  })
}

function main() {
  initScript()
  initView()
}

main()