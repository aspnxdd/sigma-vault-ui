import "server-only";

export interface VaultData {
  id: string;
  vault: string;
  strategy: string;
  tvl: string;
  totalApr: string;
  balance: string;
  icon: string;
  description: string;
  tokens: {
    primary: {
      name: string;
      symbol: string;
      image: string;
    };
    secondary?: {
      name: string;
      symbol: string;
      image: string;
    };
  };
  riskLevel: 'Low' | 'Medium' | 'High';
  protocolInfo: {
    name: string;
    website: string;
    audit: boolean;
  };
}

// This function runs only on the server
export const getVaultData = (): Record<string, VaultData> => {
  return {
    '1': {
      id: '1',
      vault: 'USDC Yield',
      strategy: 'Compound V3',
      tvl: '$12,345,678',
      totalApr: '8.24%',
      balance: '$1,234.56',
      icon: '💰',
      description: 'A conservative yield strategy that deposits USDC into Compound V3 protocol for stable returns.',
      tokens: {
        primary: {
          name: 'USD Coin',
          symbol: 'USDC',
          image: '🪙'
        }
      },
      riskLevel: 'Low',
      protocolInfo: {
        name: 'Compound V3',
        website: 'https://compound.finance',
        audit: true
      }
    },
    '2': {
      id: '2',
      vault: 'ETH Staking',
      strategy: 'Lido Finance',
      tvl: '$8,901,234',
      totalApr: '4.15%',
      balance: '$567.89',
      icon: '⚡',
      description: 'Liquid staking strategy that stakes ETH through Lido Finance protocol for ETH 2.0 rewards.',
      tokens: {
        primary: {
          name: 'Ethereum',
          symbol: 'ETH',
          image: '💎'
        },
        secondary: {
          name: 'Lido Staked ETH',
          symbol: 'stETH',
          image: '🔥'
        }
      },
      riskLevel: 'Medium',
      protocolInfo: {
        name: 'Lido Finance',
        website: 'https://lido.fi',
        audit: true
      }
    },
    '3': {
      id: '3',
      vault: 'BTC Yield',
      strategy: 'Wrapped Bitcoin',
      tvl: '$5,678,901',
      totalApr: '3.87%',
      balance: '$890.12',
      icon: '₿',
      description: 'Bitcoin yield strategy utilizing wrapped Bitcoin in DeFi protocols for conservative growth.',
      tokens: {
        primary: {
          name: 'Wrapped Bitcoin',
          symbol: 'WBTC',
          image: '🟠'
        }
      },
      riskLevel: 'Low',
      protocolInfo: {
        name: 'Wrapped Bitcoin',
        website: 'https://wbtc.network',
        audit: true
      }
    },
    '4': {
      id: '4',
      vault: 'Stable LP',
      strategy: 'Curve 3Pool',
      tvl: '$15,432,109',
      totalApr: '12.45%',
      balance: '$2,345.67',
      icon: '🔄',
      description: 'Liquidity provision strategy in Curve 3Pool for stablecoin yield farming with high APR.',
      tokens: {
        primary: {
          name: 'USD Coin',
          symbol: 'USDC',
          image: '🪙'
        },
        secondary: {
          name: 'Tether USD',
          symbol: 'USDT',
          image: '🟢'
        }
      },
      riskLevel: 'Medium',
      protocolInfo: {
        name: 'Curve Finance',
        website: 'https://curve.fi',
        audit: true
      }
    },
    '5': {
      id: '5',
      vault: 'DeFi Index',
      strategy: 'Multi-Protocol',
      tvl: '$7,890,123',
      totalApr: '15.73%',
      balance: '$456.78',
      icon: '📈',
      description: 'Diversified DeFi strategy across multiple protocols for maximum yield optimization.',
      tokens: {
        primary: {
          name: 'DeFi Index Token',
          symbol: 'DFI',
          image: '🌈'
        }
      },
      riskLevel: 'High',
      protocolInfo: {
        name: 'Multi-Protocol',
        website: '#',
        audit: false
      }
    }
  };
};

export const getAllVaults = (): VaultData[] => {
  const vaultData = getVaultData();
  return Object.values(vaultData);
};

export const getVaultById = (id: string): VaultData | null => {
  const vaultData = getVaultData();
  return vaultData[id] || null;
};
