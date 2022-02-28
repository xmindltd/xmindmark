import { Command } from 'commander'
import { ensureDirSync, removeSync } from 'fs-extra'
import { resolve } from 'path'
import { cacheDir } from '../config'
import { hasContentPipedIn } from '../utils'
import { convert, Convertion, getConverterByFormat } from './convertion'
import { CLIOptions, formatOption, outputOption } from './options'
import pkgJSON from '../../package.json'
import { filesArgument } from './arguments'

export function resetActionHandler() {
  ensureDirSync(cacheDir)
  removeSync(cacheDir)
}

export const resetCommand = new Command('reset')
  .description('Reset the cache data which m3 convertion process dependents on.')
  .action(resetActionHandler)

export async function mainActionHandler(files: string[], options: CLIOptions) {
  const { format, outputDir } = options
    
  let convertions: Convertion[]

  if (await hasContentPipedIn()) {
    convertions = [{
      m3ReadableStream: process.stdin,
      outputDir,
      outputFormat: format,
      converter: getConverterByFormat(format)
    }]
  } else {
    convertions = files.map(filePath => ({
      m3FilePath: resolve(filePath),
      outputDir,
      outputFormat: format,
      converter: getConverterByFormat(format)
    }))
  }

  await convert(convertions)
}

export const mainCommand = new Command()
  .version(pkgJSON.version, '-v', '--version')
  .usage('[subCommand] [options] [file]')
  .addArgument(filesArgument)
  .addOption(formatOption)
  .addOption(outputOption)
  .addCommand(resetCommand)
  .action(mainActionHandler)
