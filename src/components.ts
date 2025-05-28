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
  'wallet-balance': {
    name: 'wallet-balance',
    description: 'SOL balance display with real-time updates',
    files: ['wallet-balance.tsx', 'use-solana-balance.ts'],
    dependencies: ['@solana/web3.js', '@solana/wallet-adapter-react'],
    registryDependencies: ['badge'],
  },
  'network-selector': {
    // Add this new component
    name: 'network-selector',
    description: 'Solana network selector (Mainnet, Testnet, Devnet)',
    files: ['network-selector.tsx', 'use-network.ts'],
    dependencies: ['@solana/web3.js', '@solana/wallet-adapter-base'],
    registryDependencies: ['select', 'badge'],
  },
}
