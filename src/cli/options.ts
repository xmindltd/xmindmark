import { Option } from 'commander'
import { SUPPORT_FORMAT } from '../utils'

export const formatOption = new Option(
  '-f, --format <format>',
  'The target format which .xmindmark file transform into.'
).choices([SUPPORT_FORMAT.XMIND, SUPPORT_FORMAT.SVG])
  .default(SUPPORT_FORMAT.XMIND)

export const outputOption = new Option(
  '-o, --outputDir <outputDir>',
  'The output directory path of new file will be generated.'
).default(process.cwd())

type FormatOption = { format: SUPPORT_FORMAT }
type OutputOption = { outputDir: string }

export type CLIOptions = FormatOption & OutputOption
