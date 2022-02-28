#!/usr/bin/env node
import { mainCommand } from './commands'

async function main() {
  await mainCommand.parseAsync()
}

main()
