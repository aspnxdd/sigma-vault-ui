'use client';

import Link from 'next/link';

interface VaultData {
  id: string;
  vault: string;
  strategy: string;
  tvl: string;
  totalApr: string;
  balance: string;
  icon?: string;
}

export const VaultTable = () => {
  // Mock data for demonstration
  const vaultData: VaultData[] = [
    {
      id: '1',
      vault: 'USDC Yield',
      strategy: 'Compound V3',
      tvl: '$12,345,678',
      totalApr: '8.24%',
      balance: '$1,234.56',
      icon: '💰'
    },
    {
      id: '2',
      vault: 'ETH Staking',
      strategy: 'Lido Finance',
      tvl: '$8,901,234',
      totalApr: '4.15%',
      balance: '$567.89',
      icon: '⚡'
    },
    {
      id: '3',
      vault: 'BTC Yield',
      strategy: 'Wrapped Bitcoin',
      tvl: '$5,678,901',
      totalApr: '3.87%',
      balance: '$890.12',
      icon: '₿'
    },
    {
      id: '4',
      vault: 'Stable LP',
      strategy: 'Curve 3Pool',
      tvl: '$15,432,109',
      totalApr: '12.45%',
      balance: '$2,345.67',
      icon: '🔄'
    },
    {
      id: '5',
      vault: 'DeFi Index',
      strategy: 'Multi-Protocol',
      tvl: '$7,890,123',
      totalApr: '15.73%',
      balance: '$456.78',
      icon: '📈'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-2">
          Vault Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your DeFi positions across multiple strategies
        </p>
      </div>

      <div className="bg-gradient-to-br from-zinc-900/50 via-slate-900/50 to-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl shadow-black/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/50 to-slate-800/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Vault
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Strategy
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  TVL
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Total APR
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {vaultData.map((vault, index) => (
                <tr key={vault.id} className="hover:bg-gradient-to-r hover:from-blue-500/5 hover:via-purple-500/5 hover:to-cyan-500/5 transition-all duration-300 cursor-pointer group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center text-xl">
                        {vault.icon}
                      </div>
                      <div>
                        <div className="text-white font-semibold group-hover:text-blue-200 transition-colors">
                          {vault.vault}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="block">
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                        {vault.strategy}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="block">
                      <span className="text-green-400 font-semibold group-hover:text-green-300 transition-colors">
                        {vault.tvl}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="flex items-center space-x-2">
                      <span className="text-blue-400 font-bold group-hover:text-blue-300 transition-colors">
                        {vault.totalApr}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 animate-pulse"></div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="block">
                      <span className="text-white font-semibold group-hover:text-blue-200 transition-colors">
                        {vault.balance}
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-white mt-1">$5,494.12</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white text-xl">💼</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Average APR</p>
              <p className="text-2xl font-bold text-white mt-1">8.89%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Active Vaults</p>
              <p className="text-2xl font-bold text-white mt-1">5</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-xl">🏦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
