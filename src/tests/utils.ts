import { execSync } from 'child_process'
import { ensureDirSync } from 'fs-extra'
import { join } from 'path'
import { Readable } from 'stream'

export const tempFileDirForTest = join(__dirname, 'temp')

export const CLI_NAME = 'xmindmark'

export const ensureTempFileDirExist = () => ensureDirSync(tempFileDirForTest)

export const runCommandWithArgs = (cmd: string, args: string = '') => execSync(`${cmd} ${args}`, { cwd: tempFileDirForTest })

export const runCLIWithArgs = (args: string) => runCommandWithArgs(CLI_NAME, args)

export const makeReadableStringStream = (content: string) => {
  const stream = new Readable()
  stream.push(content)
  stream.push(null)

  return stream
}
