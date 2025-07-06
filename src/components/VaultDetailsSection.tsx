import { inferRouterOutputs } from "@trpc/server";
import { getRiskColor } from "../lib/utils";
import { AppRouter } from "~/server/api/root";

interface VaultStrategyDetailsProps {
  vault: inferRouterOutputs<AppRouter>["euler"]["getPoolById"];
}

export const VaultStrategyDetails = ({ vault }: VaultStrategyDetailsProps) => {
  return (
    <div className="p-6 border bg-gradient-to-br from-gray-900/40 via-slate-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border-gray-700/30">
      <h3 className="mb-4 text-xl font-semibold text-gray-100">
        Strategy Details
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Protocol:</span>
          <span className="text-gray-200">{"Euler"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Risk Level:</span>
          <span className={getRiskColor("Low").split(" ")[0]}>
            {"Low"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Audit Status:</span>
          <span className={"text-green-400"}>Audited ✓</span>
        </div>
      </div>
    </div>
  );
};

export const VaultPerformanceChart = () => {
  return (
    <div className="h-full p-6 border bg-gradient-to-br from-gray-900/40 via-slate-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border-gray-700/30">
      <h3 className="mb-4 text-xl font-semibold text-gray-100">Performance</h3>
      <div className="h-[calc(100%-3rem)] bg-gray-800/30 rounded-xl flex items-center justify-center">
        <span className="text-gray-500">Chart coming soon...</span>
      </div>
    </div>
  );
};
