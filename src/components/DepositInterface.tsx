import { useState } from 'react';
import { VaultData } from '../lib/types';
import { validateAmount } from '../lib/utils';
import { TokenInput } from './TokenInput';

interface DepositInterfaceProps {
  vault: VaultData;
  primaryAmount: string;
  secondaryAmount: string;
  primaryBalance: number | null;
  secondaryBalance: number | null;
  isLoadingBalances?: boolean;
  onPrimaryAmountChange: (amount: string) => void;
  onSecondaryAmountChange: (amount: string) => void;
  onPrimaryMaxClick: () => void;
  onSecondaryMaxClick: () => void;
}

export const DepositInterface = ({
  vault,
  primaryAmount,
  secondaryAmount,
  primaryBalance,
  secondaryBalance,
  isLoadingBalances = false,
  onPrimaryAmountChange,
  onSecondaryAmountChange,
  onPrimaryMaxClick,
  onSecondaryMaxClick
}: DepositInterfaceProps) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  
  const isPrimaryValid = primaryAmount === '' || validateAmount(primaryAmount, primaryBalance);
  const isSecondaryValid = secondaryAmount === '' || validateAmount(secondaryAmount, secondaryBalance);
  const canDeposit = primaryAmount !== '' && isPrimaryValid && secondaryAmount !== '' && isSecondaryValid;

  return (
    <div className="mt-6 space-y-4">
      {/* Tab Navigation */}
      <div className="flex bg-gray-800/50 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'deposit'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Deposit
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'withdraw'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Withdraw
        </button>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-300 mb-3">
          {activeTab === 'deposit' ? 'Deposit Amount' : 'Withdraw Amount'}
        </h4>
        
        <TokenInput
          token={vault.tokens.primary}
          amount={primaryAmount}
          balance={primaryBalance}
          isValid={isPrimaryValid}
          isPrimary={true}
          isLoadingBalance={isLoadingBalances}
          onAmountChange={onPrimaryAmountChange}
          onMaxClick={onPrimaryMaxClick}
        />

        {/* Plus Icon */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">+</span>
          </div>
        </div>

        <TokenInput
          token={vault.tokens.secondary}
          amount={secondaryAmount}
          balance={secondaryBalance}
          isValid={isSecondaryValid}
          isPrimary={false}
          isLoadingBalance={isLoadingBalances}
          onAmountChange={onSecondaryAmountChange}
          onMaxClick={onSecondaryMaxClick}
        />

        {/* Estimated Output */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {activeTab === 'deposit' ? 'You will receive:' : 'You will receive:'}
            </span>
            <span className="text-sm font-semibold text-blue-300">
              {activeTab === 'deposit' 
                ? `~${(parseFloat(primaryAmount || '0') + parseFloat(secondaryAmount || '0')).toFixed(6)} LP Tokens`
                : `~${(parseFloat(primaryAmount || '0') + parseFloat(secondaryAmount || '0')).toFixed(6)} Tokens`
              }
            </span>
          </div>
        </div>
      </div>

      <button 
        disabled={!canDeposit}
        className={`w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg ${
          canDeposit
            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white hover:scale-105 shadow-blue-500/25'
            : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
        }`}
      >
        {canDeposit 
          ? (activeTab === 'deposit' ? 'Deposit' : 'Withdraw')
          : `Enter amounts to ${activeTab}`
        }
      </button>
    </div>
  );
};
