import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

interface TokenCardProps {
  token: {
    name: string;
    symbol: string;
    image: string;
  };
  amount?: number;
  isPrimary?: boolean;
}

export const TokenCard = ({
  token,
  amount = 0,
  isPrimary = true,
}: TokenCardProps) => {
  const gradientClass = isPrimary
    ? "bg-gradient-to-br from-blue-400 to-cyan-400"
    : "bg-gradient-to-br from-purple-400 to-pink-400";

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-gray-700/30 rounded-xl">
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center text-2xl`}
        >
          {token.image}
        </div>
        <div>
          <p className="font-semibold text-gray-100">{token.name}</p>
          <p className="text-sm text-gray-400">{token.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-100">{amount.toLocaleString()}</p>
      </div>
    </div>
  );
};

interface VaultAssetsProps {
  vault: inferRouterOutputs<AppRouter>["euler"]["getPoolById"];
  depositedPrimary?: number;
  depositedSecondary?: number;
}

export const VaultAssets = ({
  vault,
  depositedPrimary = 0,
  depositedSecondary = 0,
}: VaultAssetsProps) => {
  return (
    <div className="p-6 border bg-gradient-to-br from-gray-800/40 to-slate-800/40 rounded-2xl border-gray-600/30">
      <h3 className="mb-4 text-xl font-semibold text-gray-200">
        Deposited Assets
      </h3>

      <TokenCard
        token={{
          image: "🟡",
          name: vault.token0.symbol,
          symbol: vault.token0.symbol,
        }}
        amount={depositedPrimary}
        isPrimary={true}
      />
      <TokenCard
        token={{
          image: "🔵",
          name: vault.token1.symbol,
          symbol: vault.token1.symbol,
        }}
        amount={depositedSecondary}
        isPrimary={false}
      />
    </div>
  );
};
