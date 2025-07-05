import { VaultData } from './types';

export const validateAmount = (amount: string, balance: number | null): boolean => {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount < 0) return false;
  if (balance === null || numAmount > balance) return false;
  return true;
};

export const getRiskColor = (risk: string): string => {
  switch (risk) {
    case 'Low': return 'text-green-400 bg-green-400/10';
    case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
    case 'High': return 'text-red-400 bg-red-400/10';
    default: return 'text-gray-400 bg-gray-400/10';
  }
};

export const getVaultData = (): Record<string, VaultData> => ({
  '1': {
    id: '1',
    vault: 'USDC Yield',
    strategy: 'Compound V3',
    tvl: '$12,345,678',
    totalApr: '8.24%',
    balance: '$1,234.56',
    icon: '💰',
    description: 'A conservative yield strategy that deposits USDC into Compound V3 protocol for stable returns.',      tokens: {
        primary: {
          name: 'USD Coin',
          symbol: 'USDC',
          image: '🪙',
          address: '0xd7a892f28dEdC74E6b7b33F93BE08abfC394a360'
        },
        secondary: {
          name: 'Dai Stablecoin',
          symbol: 'DAI',
          image: '🟡',
          address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
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
    description: 'Liquid staking strategy that stakes ETH through Lido Finance protocol for ETH 2.0 rewards.',      tokens: {
        primary: {
          name: 'Ethereum',
          symbol: 'ETH',
          image: '💎',
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
        },
        secondary: {
          name: 'Lido Staked ETH',
          symbol: 'stETH',
          image: '🔥',
          address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'
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
    description: 'Bitcoin yield strategy utilizing wrapped Bitcoin in DeFi protocols for conservative growth.',      tokens: {
        primary: {
          name: 'Wrapped Bitcoin',
          symbol: 'WBTC',
          image: '🟠',
          address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
        },
        secondary: {
          name: 'Bitcoin',
          symbol: 'BTC',
          image: '⚡',
          address: '0x0316EB71485b0Ab14103307bf65a021042c6d380'
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
    description: 'Liquidity provision strategy in Curve 3Pool for stablecoin yield farming with high APR.',      tokens: {
        primary: {
          name: 'USD Coin',
          symbol: 'USDC',
          image: '🪙',
          address: '0xd7a892f28dEdC74E6b7b33F93BE08abfC394a360'
        },
        secondary: {
          name: 'Tether USD',
          symbol: 'USDT',
          image: '🟢',
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
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
    description: 'Diversified DeFi strategy across multiple protocols for maximum yield optimization.',      tokens: {
        primary: {
          name: 'DeFi Index Token',
          symbol: 'DFI',
          image: '🌈',
          address: '0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b'
        },
        secondary: {
          name: 'Governance Token',
          symbol: 'GOV',
          image: '🏛️',
          address: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0'
        }
      },
    riskLevel: 'High',
    protocolInfo: {
      name: 'Multi-Protocol',
      website: '#',
      audit: false
    }
  }
});
