import { inferRouterOutputs } from "@trpc/server";
import { getRiskColor } from "../lib/utils";
import { AppRouter } from "~/server/api/root";

interface VaultHeaderProps {
  vault: inferRouterOutputs<AppRouter>["euler"]["getPoolById"];
}

export const VaultHeader = ({ vault }: VaultHeaderProps) => {
  return (
    <div className="flex items-start mb-6 space-x-6">
      <div className="flex items-center justify-center w-16 h-16 text-3xl shadow-lg lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 lg:text-4xl">
        {/* {vault.icon} */}
      </div>
      <div className="flex-1">
        <h1 className="mb-2 text-3xl font-bold text-transparent lg:text-4xl bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text">
          Euler Swap
        </h1>
        <p className="mb-3 text-lg text-gray-300 lg:text-xl">Euler</p>
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
              "Low"
            )}`}
          >
            {"Low"} Risk
          </span>
          {
            <span className="px-3 py-1 text-sm font-medium text-green-400 rounded-full bg-green-400/10">
              ✓ Audited
            </span>
          }
        </div>
      </div>
    </div>
  );
};
