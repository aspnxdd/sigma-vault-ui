import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

interface VaultMetricsProps {
  vault: inferRouterOutputs<AppRouter>["euler"]["getPoolById"];
}

export const VaultMetrics = ({ vault }: VaultMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="p-4 border bg-gray-800/50 rounded-xl border-gray-700/50">
        <p className="mb-1 text-sm text-gray-400">Total swaps</p>
        <p className="text-2xl font-bold text-blue-400">{vault.swapCount}</p>
      </div>
      <div className="p-4 border bg-gray-800/50 rounded-xl border-gray-700/50">
        <p className="mb-1 text-sm text-gray-400">Created At</p>
        <p className="text-2xl font-bold text-green-400">
          {" "}
          {vault.createdAtTimestamp.toLocaleDateString()}
        </p>
      </div>
      {/* <div className="p-4 border bg-gray-800/50 rounded-xl border-gray-700/50">
        <p className="mb-1 text-sm text-gray-400">Your Balance</p>
        <p className="text-2xl font-bold text-white">{vault.balance}</p>
      </div>
      <div className="p-4 border bg-gray-800/50 rounded-xl border-gray-700/50">
        <p className="mb-1 text-sm text-gray-400">Protocol</p>
        <p className="text-lg font-semibold text-gray-200">
          {vault.protocolInfo.name}
        </p>
      </div> */}
    </div>
  );
};
