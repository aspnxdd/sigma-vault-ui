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

      <div className="overflow-hidden border shadow-2xl bg-gradient-to-br from-zinc-900/50 via-slate-900/50 to-zinc-900/50 backdrop-blur-xl rounded-2xl border-zinc-700/50 shadow-black/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/50 to-slate-800/50">
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Vault
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Strategy
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  TVL
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Total APR
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-300 uppercase">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {vaults.map((vault, index) => (
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
                        {/* {vault.strategy} */}a
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/vault/${vault.id}`} className="block">
                      <span className="font-semibold text-green-400 transition-colors group-hover:text-green-300">
                        1234
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/vault/${vault.id}`}
                      className="flex items-center space-x-2"
                    >
                      <span className="font-bold text-blue-400 transition-colors group-hover:text-blue-300">
                        12
                      </span>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
        <div className="p-6 border bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border-green-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-400">
                Total Portfolio Value
              </p>
              <p className="mt-1 text-2xl font-bold text-white">$5,494.12</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <span className="text-xl text-white">💼</span>
            </div>
          </div>
        </div>

        <div className="p-6 border bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border-blue-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Average APR</p>
              <p className="mt-1 text-2xl font-bold text-white">8.89%</p>
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
              <p className="mt-1 text-2xl font-bold text-white">5</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <span className="text-xl text-white">🏦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
