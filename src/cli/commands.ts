import { Command } from 'commander'
import { ensureDirSync, removeSync } from 'fs-extra'
import { resolve } from 'path'
import { cacheDir, version } from '../config'
import { hasContentPipedIn } from '../utils'
import { convert, Convertion, getConverterByFormat } from './convertion'
import { CLIOptions, formatOption, outputOption } from './options'
import { filesArgument } from './arguments'

export function resetActionHandler() {
  ensureDirSync(cacheDir)
  removeSync(cacheDir)
}

export const resetCommand = new Command('reset')
  .description('Reset the cache data which xmindmark convertion process dependents on.')
  .action(resetActionHandler)

export async function mainActionHandler(files: string[], options: CLIOptions) {
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

export const mainCommand = new Command()
  .version(version, '-v', '--version')
  .usage('[subCommand] [options] [file]')
  .addArgument(filesArgument)
  .addOption(formatOption)
  .addOption(outputOption)
  .addCommand(resetCommand)
  .action(mainActionHandler)
