// src/utils.ts
import fs from 'fs'

export function checkShadcnProject(): boolean {
  try {
    return (
      fs.existsSync('./components.json') || fs.existsSync('./src/components/ui')
    )
  } catch {
    return false
  }
}

export function detectPackageManager(): 'npm' | 'yarn' | 'pnpm' {
  if (fs.existsSync('./yarn.lock')) return 'yarn'
  if (fs.existsSync('./pnpm-lock.yaml')) return 'pnpm'
  return 'npm'
}
