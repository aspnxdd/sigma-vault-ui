interface TokenInputProps {
  token: {
    name: string;
    symbol: string;
    image: string;
  };
  amount: string;
  balance: number;
  isValid: boolean;
  isPrimary?: boolean;
  onAmountChange: (amount: string) => void;
  onMaxClick: () => void;
}

export const TokenInput = ({ 
  token, 
  amount, 
  balance, 
  isValid, 
  isPrimary = true,
  onAmountChange,
  onMaxClick
}: TokenInputProps) => {
  const borderColor = isPrimary ? 'focus-within:border-blue-500/50' : 'focus-within:border-purple-500/50';
  const buttonColor = isPrimary 
    ? 'text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20'
    : 'text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20';
  const iconGradient = isPrimary 
    ? 'bg-gradient-to-br from-blue-400 to-cyan-400'
    : 'bg-gradient-to-br from-purple-400 to-pink-400';

  return (
    <div className={`bg-gray-800/60 rounded-2xl p-4 border-2 transition-all duration-200 ${
      !isValid 
        ? 'border-red-500/50 bg-red-500/5' 
        : `border-gray-600/50 hover:border-gray-500/50 ${borderColor}`
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded-full ${iconGradient} flex items-center justify-center text-sm`}>
            {token.image}
          </div>
          <span className="text-sm font-medium text-gray-300">{token.symbol}</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Balance</div>
          <div className="text-sm text-gray-300">{balance.toLocaleString()}</div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="number"
          placeholder="0.0"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="flex-1 bg-transparent text-white text-xl font-bold outline-none placeholder-gray-500"
          min="0"
          step="0.000001"
        />
        <button 
          onClick={onMaxClick}
          className={`text-xs transition-colors font-medium px-2 py-1 rounded ${buttonColor}`}
        >
          MAX
        </button>
      </div>
      {!isValid && (
        <div className="mt-2 text-xs text-red-400">
          {parseFloat(amount) > balance ? 'Insufficient balance' : 'Invalid amount'}
        </div>
      )}
    </div>
  );
};
