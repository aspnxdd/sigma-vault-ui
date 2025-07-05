'use client';

import Link from 'next/link';
import { useState } from 'react';
import { VaultDetailProps } from '../lib/types';
import { getVaultData } from '../lib/utils';
import { VaultHeader } from './VaultHeader';
import { VaultMetrics } from './VaultMetrics';
import { VaultAssets } from './VaultAssets';
import { DepositInterface } from './DepositInterface';
import { VaultPerformanceChart } from './VaultDetailsSection';

export const VaultDetail = ({ vaultId }: VaultDetailProps) => {
  // State for deposit amounts and validation
  const [primaryAmount, setPrimaryAmount] = useState('');
  const [secondaryAmount, setSecondaryAmount] = useState('');
  const [primaryBalance] = useState(1000.00); // Mock user balance
  const [secondaryBalance] = useState(500.00); // Mock user balance

  const vaultData = getVaultData();
  const vault = vaultData[vaultId];

  const handlePrimaryMaxClick = () => setPrimaryAmount(primaryBalance.toString());
  const handleSecondaryMaxClick = () => setSecondaryAmount(secondaryBalance.toString());

  if (!vault) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">Vault Not Found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back to Dashboard
        </Link>
      </div>

      {/* Top Section - Vault Overview */}
      <div className="bg-gradient-to-br from-gray-900/60 via-slate-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl shadow-black/20 overflow-hidden mb-8">
        <div className="p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch min-h-[600px]">
            
            {/* Left Column - Vault Info */}
            <div className="lg:col-span-2 flex flex-col">
              <VaultHeader vault={vault} />

              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {vault.description}
              </p>

              <VaultMetrics vault={vault} />

              {/* Performance Chart - Below metrics, fills remaining space */}
              <div className="mt-8 flex-1">
                <VaultPerformanceChart />
              </div>
            </div>

            {/* Right Column - Assets and Deposit */}
            <div className="lg:col-span-1">
              <VaultAssets vault={vault} />
              
              <DepositInterface
                vault={vault}
                primaryAmount={primaryAmount}
                secondaryAmount={secondaryAmount}
                primaryBalance={primaryBalance}
                secondaryBalance={secondaryBalance}
                onPrimaryAmountChange={setPrimaryAmount}
                onSecondaryAmountChange={setSecondaryAmount}
                onPrimaryMaxClick={handlePrimaryMaxClick}
                onSecondaryMaxClick={handleSecondaryMaxClick}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
