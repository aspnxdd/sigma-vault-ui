import { VaultData } from '../lib/types';
import { getRiskColor } from '../lib/utils';

interface VaultHeaderProps {
  vault: VaultData;
}

export const VaultHeader = ({ vault }: VaultHeaderProps) => {
  return (
    <div className="flex items-start space-x-6 mb-6">
      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center text-3xl lg:text-4xl shadow-lg">
        {vault.icon}
      </div>
      <div className="flex-1">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent mb-2">
          {vault.vault}
        </h1>
        <p className="text-gray-300 text-lg lg:text-xl mb-3">
          {vault.strategy}
        </p>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(vault.riskLevel)}`}>
            {vault.riskLevel} Risk
          </span>
          {vault.protocolInfo.audit && (
            <span className="px-3 py-1 rounded-full text-sm font-medium text-green-400 bg-green-400/10">
              ✓ Audited
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
