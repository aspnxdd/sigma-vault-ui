export const validateAmount = (
  amount: string,
  balance: number | null
): boolean => {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount < 0) return false;
  if (balance === null || numAmount > balance) return false;
  return true;
};

export const getRiskColor = (risk: string): string => {
  switch (risk) {
    case "Low":
      return "text-green-400 bg-green-400/10";
    case "Medium":
      return "text-yellow-400 bg-yellow-400/10";
    case "High":
      return "text-red-400 bg-red-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
};
