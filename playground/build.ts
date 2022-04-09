import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { build as buildForProduction } from 'vite'

async function build() {
  const production = await buildForProduction()
  if ('output' in production) {
    const outputHtml = production.output.find(output => output.type === 'asset' && output.fileName === 'index.html') as any

    const dist = join(__dirname, 'dist')
    if (!existsSync(dist)) { mkdirSync(dist) }

    const outputFile = join(dist, 'index.html')
    outputHtml && writeFileSync(outputFile, outputHtml.source)
  }
}

build()