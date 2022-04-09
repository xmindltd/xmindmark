import { createMapByXMindMark } from '../../src/parser/mindmark'

const input = document.getElementById('content') as HTMLTextAreaElement
const button = document.getElementById('convert') as HTMLButtonElement
const result = document.getElementById('result') as HTMLDivElement

button.addEventListener('click', () => {
  result.innerHTML = ''
  
  const model = createMapByXMindMark(input.value)
  new Snowbrush.SheetEditor({
    el: result,
    model: new Snowbrush.Model.Sheet(model)
  }).initInnerView()
})

