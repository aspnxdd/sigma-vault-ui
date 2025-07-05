import { VaultData } from '../lib/types';

interface VaultMetricsProps {
  vault: VaultData;
}

export const VaultMetrics = ({ vault }: VaultMetricsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
        <p className="text-gray-400 text-sm mb-1">Total APR</p>
        <p className="text-2xl font-bold text-blue-400">{vault.totalApr}</p>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
        <p className="text-gray-400 text-sm mb-1">TVL</p>
        <p className="text-2xl font-bold text-green-400">{vault.tvl}</p>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
        <p className="text-gray-400 text-sm mb-1">Your Balance</p>
        <p className="text-2xl font-bold text-white">{vault.balance}</p>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
        <p className="text-gray-400 text-sm mb-1">Protocol</p>
        <p className="text-lg font-semibold text-gray-200">{vault.protocolInfo.name}</p>
      </div>
    </div>
  );
};
