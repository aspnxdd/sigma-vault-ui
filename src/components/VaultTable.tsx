"use client";

import { inferRouterOutputs } from "@trpc/server";
import Link from "next/link";
import { AppRouter } from "~/server/api/root";

type VaultData = inferRouterOutputs<AppRouter>["euler"]["getAllPools"][number];

export const VaultTable = ({ vaults }: { vaults: VaultData[] }) => {
  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-transparent lg:text-4xl bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text">
          Vault Dashboard
        </h1>
        <p className="text-lg text-gray-400">
          Manage your DeFi positions across multiple strategies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        <div className="p-6 border bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border-blue-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Total Swaps</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {vaults.reduce((acc, vault) => acc + vault.swapCount, 0)}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <span className="text-xl text-white">📊</span>
            </div>
          </div>
        </div>

        <div className="p-6 border bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-400">
                Active Vaults
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {vaults.length}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <span className="text-xl text-white">🏦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border shadow-2xl bg-gradient-to-br from-zinc-900/50 via-slate-900/50 to-zinc-900/50 backdrop-blur-xl rounded-2xl border-zinc-700/50 shadow-black/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/50 to-slate-800/50">
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Vault
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Total Swaps
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Volume
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Amount
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {vaults.map((vault) => (
                <tr
                  key={vault.id}
                  className="transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500/5 hover:via-purple-500/5 hover:to-cyan-500/5 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/vault/${vault.id}`}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex items-center justify-center w-10 h-10 text-xl rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500"></div>
                      <div>
                        <div className="font-semibold text-white transition-colors group-hover:text-blue-200">
                          {vault.token0.symbol} / {vault.token1.symbol}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="block">
                      <span className="text-gray-300 transition-colors group-hover:text-gray-200">
                        {vault.swapCount}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="block">
                      <div className="flex flex-col space-y-1">
                        <span className="text-gray-300 transition-colors group-hover:text-gray-200">
                          {vault.token0.symbol}{" "}
                          {vault.volumeToken0D.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-gray-300 transition-colors group-hover:text-gray-200">
                          {vault.token1.symbol}{" "}
                          {vault.volumeToken1D.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/vault/${vault.id}`}
                      className="flex items-center space-x-2"
                    >
                      <div className="flex flex-col space-y-1">
                        <span className="text-gray-300 transition-colors group-hover:text-gray-200">
                          {vault.token0.symbol}{" "}
                          {vault.amount0D.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-gray-300 transition-colors group-hover:text-gray-200">
                          {vault.token1.symbol}{" "}
                          {vault.amount1D.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 animate-pulse"></div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="block">
                      <span className="font-semibold text-white transition-colors group-hover:text-blue-200">
                        {vault.createdAtTimestamp.toLocaleDateString()}
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
