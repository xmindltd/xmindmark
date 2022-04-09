import axios from 'axios'

export async function loadExternalScript(url: string,): Promise<void> {
  const response = await axios.get(url)
  const script = document.createElement('script')
  script.innerHTML = response.data
  document.body.appendChild(script)
}

export async function loadFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('loadend', () => resolve(fileReader.result as string))
    fileReader.addEventListener('error', reject)
    fileReader.addEventListener('abort', reject)
    fileReader.readAsText(file)
  })
}