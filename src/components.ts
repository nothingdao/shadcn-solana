// src/components.ts
export interface ComponentInfo {
  name: string
  description: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

export const AVAILABLE_COMPONENTS: Record<string, ComponentInfo> = {
  'wallet-connect': {
    name: 'wallet-connect',
    description: 'Complete wallet connection with modal and balance display',
    files: [
      'wallet-provider.tsx',
      'wallet-connect-button.tsx',
      'wallet-select-modal.tsx',
    ],
    dependencies: [
      '@solana/web3.js',
      '@solana/wallet-adapter-base',
      '@solana/wallet-adapter-react',
      '@solana/wallet-adapter-wallets',
      'sonner',
    ],
    registryDependencies: [
      'button',
      'dropdown-menu',
      'dialog',
      'scroll-area',
      'avatar',
      'badge',
    ],
  },
  'network-selector': {
    name: 'network-selector',
    description: 'Solana network selector (Mainnet, Testnet, Devnet)',
    files: ['network-selector.tsx', 'use-network.ts'],
    dependencies: ['@solana/web3.js', '@solana/wallet-adapter-base'],
    registryDependencies: ['select', 'badge'],
  },
  'setting-sheet': {
    name: 'setting-sheet',
    description: 'Settings sheet for wallet and network configuration',
    files: ['setting-sheet.tsx'],
    dependencies: ['@solana/web3.js', '@solana/wallet-adapter-base'],
    registryDependencies: ['sheet', 'button', 'select'],
  },
}
