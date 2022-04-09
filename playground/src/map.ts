import { createMapByXMindMark } from '../../src/parser/mindmark'

const convert = document.getElementById('cursor') as HTMLDivElement
const arrowAnimation = convert.animate([
  { transform: 'translateX(0)' },
  { transform: 'translateX(20%)' },
  { transform: 'translateX(0)' },
], {
  fill: 'auto',
  easing: 'ease',
  duration: 400
})
function playPointerAnimation() {
  arrowAnimation.cancel()
  arrowAnimation.play()
}

export function renderMapByString(content: string): Promise<void> {
  const result = document.getElementById('result') as HTMLDivElement
  result.innerHTML = ''
  
  return new Promise((resolve, reject) => {
    const model = createMapByXMindMark(content)
    const sb = new Snowbrush.SheetEditor({
      el: result,
      model: new Snowbrush.Model.Sheet(model)
    })
    sb.on('SHEET_CONTENT_LOADED', () => {
      sb.execAction('fitMap')
      playPointerAnimation()
      resolve()
    })
    sb.initInnerView()
  })
}
