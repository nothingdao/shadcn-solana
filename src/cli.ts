#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import execa = require('execa')
import inquirer from 'inquirer'
import { AVAILABLE_COMPONENTS } from './components.js'
import { checkShadcnProject } from './utils.js'

const program = new Command()
const REGISTRY_URL =
  'https://raw.githubusercontent.com/nothingdao/shadcn-solana/main/registry'

program
  .name('shadcn-solana')
  .description('Solana components built with shadcn/ui primitives')
  .version('1.0.0')

program
  .command('add')
  .description('Add Solana components to your project')
  .argument('[component]', 'Component to add (wallet-connect, wallet-balance)')
  .action(async (component) => {
    if (!checkShadcnProject()) {
      console.log(
        chalk.red("Error: This doesn't appear to be a shadcn/ui project.")
      )
      console.log(chalk.gray('Please run `npx shadcn@latest init` first.'))
      process.exit(1)
    }

    try {
      await addComponent(component)
    } catch (error) {
      console.error(chalk.red('Error:'), (error as Error).message)
      process.exit(1)
    }
  })

program
  .command('list')
  .description('List available components')
  .action(() => {
    console.log(chalk.blue.bold('\n⚡ Available Solana Components:\n'))

    Object.values(AVAILABLE_COMPONENTS).forEach((comp) => {
      console.log(chalk.green(`  ${comp.name}`))
      console.log(chalk.gray(`    ${comp.description}`))
      console.log()
    })
  })

async function addComponent(component?: string) {
  let componentToAdd = component

  if (!componentToAdd || !AVAILABLE_COMPONENTS[componentToAdd]) {
    const { selectedComponent } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedComponent',
        message: 'Select component to add:',
        choices: Object.values(AVAILABLE_COMPONENTS).map((comp) => ({
          name: `${comp.name} - ${comp.description}`,
          value: comp.name,
        })),
      },
    ])
    componentToAdd = selectedComponent
  }

  if (!componentToAdd) {
    throw new Error('No component selected')
  }

  const comp = AVAILABLE_COMPONENTS[componentToAdd]
  const spinner = ora(`Adding ${comp.name}...`).start()

  try {
    const componentUrl = `${REGISTRY_URL}/${componentToAdd}.json`

    const child = execa('npx', ['shadcn@latest', 'add', componentUrl], {
      stdio: ['pipe', 'inherit', 'inherit'], // pipe stdin, inherit stdout/stderr
    })

    // Automatically select "Use --force" when prompted
    setTimeout(() => {
      child.stdin?.write('\n') // Press Enter to select the highlighted option
      child.stdin?.end()
    }, 1000) // Wait 1 second for the prompt to appear

    await child

    spinner.succeed(chalk.green(`Added ${comp.name}`))
    console.log(chalk.gray('\nNext steps:'))
    console.log(chalk.gray('  1. Wrap your app with <SolanaWalletProvider>'))
    console.log(chalk.gray('  2. Use the component in your pages'))
  } catch (error) {
    spinner.fail(chalk.red(`Failed to add ${comp.name}`))
    throw error
  }
}

program.parse()
