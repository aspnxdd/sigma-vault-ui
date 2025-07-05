import { VaultData } from '../lib/types';
import { getRiskColor } from '../lib/utils';

interface VaultStrategyDetailsProps {
  vault: VaultData;
}

export const VaultStrategyDetails = ({ vault }: VaultStrategyDetailsProps) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/40 via-slate-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Strategy Details</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Protocol:</span>
          <span className="text-gray-200">{vault.protocolInfo.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Risk Level:</span>
          <span className={getRiskColor(vault.riskLevel).split(' ')[0]}>{vault.riskLevel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Audit Status:</span>
          <span className={vault.protocolInfo.audit ? 'text-green-400' : 'text-yellow-400'}>
            {vault.protocolInfo.audit ? 'Audited ✓' : 'Pending'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const VaultPerformanceChart = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900/40 via-slate-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-6 h-full">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Performance</h3>
      <div className="h-[calc(100%-3rem)] bg-gray-800/30 rounded-xl flex items-center justify-center">
        <span className="text-gray-500">Chart coming soon...</span>
      </div>
    </div>
  );
};
