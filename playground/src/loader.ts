export async function loadFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('loadend', () => resolve(fileReader.result as string))
    fileReader.addEventListener('error', reject)
    fileReader.addEventListener('abort', reject)
    fileReader.readAsText(file)
  })
}

export function downloadFile(content: ArrayBuffer, fileName: string) {
  const downloader = document.createElement('a')
  downloader.style.setProperty('display', 'none')
  document.body.appendChild(downloader)

  const blob = new Blob([content])
  const url = URL.createObjectURL(blob)
  downloader.href = url
  downloader.download = fileName
  downloader.click()

  // clear
  URL.revokeObjectURL(url)
  document.body.removeChild(downloader)
}