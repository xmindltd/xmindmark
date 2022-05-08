import { Command } from 'commander'
import { ensureDirSync, existsSync, readFileSync, removeSync, writeFileSync } from 'fs-extra'
import { parse, resolve } from 'path'
import { cacheDir, version } from '../config'
import { hasContentPipedIn, SUPPORT_FORMAT } from '../utils'
import { convert, Convertion, getConverterByFormat } from './convertion'
import { CLIOptions, formatOption, outputOption } from './options'
import { filesArgument } from './arguments'
import { parseXMindToXMindMarkFile } from '../lib/xmind-to-xmindmark'

export function resetActionHandler() {
  ensureDirSync(cacheDir)
  removeSync(cacheDir)
}

export const resetCommand = new Command('reset')
  .description('Reset the cache data which xmindmark convertion process dependents on.')
  .action(resetActionHandler)

export async function fromActionHandler(xmindFilePath: string, outputFilePath: string | undefined) {
  const xmindFile = readFileSync(xmindFilePath)
  const xmindmarkContent = await parseXMindToXMindMarkFile(xmindFile)

  if (outputFilePath) {
    let outputPath = resolve(outputFilePath)
    if (!parse(outputPath).ext) outputPath += '.xmindmark'

    if (existsSync(outputPath)) {
      process.stderr.write(`Output file exist: ${outputPath}, convertion has been skipped.\n`)
      return
    }

    writeFileSync(outputPath, xmindmarkContent)
    return
  }

  process.stdout.write(xmindmarkContent)
}

export const fromCommand = new Command('from')
  .usage('<xmindFilePath> [outputFilePath]')
  .argument('<xmindFilePath>', 'Specify the .xmind file convert from.')
  .argument('[outputFilePath]', 'Specify the output file path. If not, generated xmindmark content will be output to stdout.')
  .description('Generate .xmindmark file from other types of file')
  .action(fromActionHandler)

export async function mainActionHandler(files: string[], options: CLIOptions, command: Command) {  
  if (files.length === 0) command.help()

  const { format, outputDir } = options

  let convertions: Convertion[]

  if (await hasContentPipedIn()) {
    convertions = [{
      xmindMarkReadableStream: process.stdin,
      outputDir,
      outputFormat: format,
      converter: getConverterByFormat(format)
    }]
  } else {
    convertions = files.map(filePath => ({
      xmindMarkFilePath: resolve(filePath),
      outputDir,
      outputFormat: format,
      converter: getConverterByFormat(format)
    }))
  }

  await convert(convertions)
}

export const mainCommand = new Command('xmindmark')
  .version(version, '-v, --version')
  .usage('[subCommand] [options] [file]')
  .addArgument(filesArgument)
  .addOption(formatOption)
  .addOption(outputOption)
  .addCommand(resetCommand)
  .addCommand(fromCommand)
  .action(mainActionHandler)
