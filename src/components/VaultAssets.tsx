import { VaultData } from '../lib/types';

interface TokenCardProps {
  token: {
    name: string;
    symbol: string;
    image: string;
  };
  amount?: number;
  isPrimary?: boolean;
}

export const TokenCard = ({ token, amount = 0, isPrimary = true }: TokenCardProps) => {
  const gradientClass = isPrimary 
    ? 'bg-gradient-to-br from-blue-400 to-cyan-400' 
    : 'bg-gradient-to-br from-purple-400 to-pink-400';

  return (
    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl mb-4">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center text-2xl`}>
          {token.image}
        </div>
        <div>
          <p className="font-semibold text-gray-100">{token.name}</p>
          <p className="text-gray-400 text-sm">{token.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-100">{amount.toLocaleString()}</p>
      </div>
    </div>
  );
};

interface VaultAssetsProps {
  vault: VaultData;
}

export const VaultAssets = ({ vault }: VaultAssetsProps) => {
  // Mock deposited amounts - in real app this would come from user's actual deposits
  const depositedPrimary = 0; // User's deposited amount for primary token
  const depositedSecondary = 0; // User's deposited amount for secondary token

  return (
    <div className="bg-gradient-to-br from-gray-800/40 to-slate-800/40 rounded-2xl p-6 border border-gray-600/30">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Deposited Assets</h3>
      
      <TokenCard 
        token={vault.tokens.primary} 
        amount={depositedPrimary}
        isPrimary={true} 
      />
      <TokenCard 
        token={vault.tokens.secondary} 
        amount={depositedSecondary}
        isPrimary={false} 
      />
    </div>
  );
};
