"use client";

import Link from "next/link";
import { useState } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { Address, erc20Abi } from "viem";
import { VaultHeader } from "./VaultHeader";
import { VaultMetrics } from "./VaultMetrics";
import { VaultAssets } from "./VaultAssets";
import { DepositInterface } from "./DepositInterface";
import { VaultPerformanceChart } from "./VaultDetailsSection";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

export const VaultDetail = ({
  vault,
  depositedAssets,
}: {
  vault: inferRouterOutputs<AppRouter>["euler"]["getPoolById"];
  depositedAssets: inferRouterOutputs<AppRouter>["euler"]["getPoolDepositedAssets"];
}) => {
  const [primaryAmount, setPrimaryAmount] = useState("");
  const [secondaryAmount, setSecondaryAmount] = useState("");

  const { address, chainId } = useAccount();

  const { data: tokenBalances, isLoading: isLoadingBalances } =
    useReadContracts({
      query: {
        enabled: !!address && !!vault && !!chainId,
      },
      allowFailure: false,
      contracts: vault
        ? [
            {
              address: vault.token0.id as Address,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [address!],
              chainId,
            },
            {
              address: vault.token0.id as Address,
              abi: erc20Abi,
              functionName: "decimals",
              chainId,
            },
            {
              address: vault.token1.id as Address,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [address!],
              chainId,
            },
            {
              address: vault.token1.id as Address,
              abi: erc20Abi,
              functionName: "decimals",
              chainId,
            },
          ]
        : [],
    });

  const primaryBalance =
    tokenBalances && tokenBalances[0] && tokenBalances[1]
      ? Number(tokenBalances[0]) / Math.pow(10, Number(tokenBalances[1]))
      : null;

  const secondaryBalance =
    tokenBalances && tokenBalances[2] && tokenBalances[3]
      ? Number(tokenBalances[2]) / Math.pow(10, Number(tokenBalances[3]))
      : null;

  const handlePrimaryMaxClick = () => {
    if (primaryBalance !== null) {
      setPrimaryAmount(primaryBalance.toString());
    }
  };

  const handleSecondaryMaxClick = () => {
    if (secondaryBalance !== null) {
      setSecondaryAmount(secondaryBalance.toString());
    }
  };

  const depositedAssetsByUser = address
    ? depositedAssets.find((asset) =>
        asset.userId.toLowerCase().includes(address.toLowerCase())
      )
    : null;

  // Parse deposited/withdrawable amounts from getDeposit call
  const depositedPrimary =
    tokenBalances && tokenBalances[1]
      ? Number(depositedAssetsByUser?.amount0) /
        Math.pow(10, Number(tokenBalances[1]))
      : 0; // User's withdrawable amount for primary token
  const depositedSecondary =
    tokenBalances && tokenBalances[3]
      ? Number(depositedAssetsByUser?.amount1) /
        Math.pow(10, Number(tokenBalances[3]))
      : 0; // User's withdrawable amount for secondary token

  // Calculate amounts with decimals for contract calls
  const primaryDecimals =
    tokenBalances && tokenBalances[1] ? Number(tokenBalances[1]) : null;
  const secondaryDecimals =
    tokenBalances && tokenBalances[3] ? Number(tokenBalances[3]) : null;

  const primaryAmountWithDecimals =
    primaryAmount && primaryDecimals
      ? parseFloat(primaryAmount) * Math.pow(10, primaryDecimals)
      : 0;
  const secondaryAmountWithDecimals =
    secondaryAmount && secondaryDecimals
      ? parseFloat(secondaryAmount) * Math.pow(10, secondaryDecimals)
      : 0;

  if (!vault) {
    return (
      <div className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-200">
            Vault Not Found
          </h1>
          <Link
            href="/"
            className="text-blue-400 transition-colors hover:text-blue-300"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 transition-colors hover:text-gray-200 group"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to Dashboard
        </Link>
      </div>
      <div className="mb-8 overflow-hidden border shadow-2xl bg-gradient-to-br from-gray-900/60 via-slate-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border-gray-700/30 shadow-black/20">
        <div className="p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch min-h-[600px]">
            <div className="flex flex-col lg:col-span-2">
              <VaultHeader vault={vault} />
              <p className="mb-6 text-lg leading-relaxed text-gray-400">
                A conservative yield strategy that deposits liquidity into Euler
                protocol for stable returns.
              </p>
              <VaultMetrics vault={vault} />
              <div className="flex-1 mt-8">
                <VaultPerformanceChart />
              </div>
            </div>
            <div className="lg:col-span-1">
              {(depositedPrimary > 0 || depositedSecondary > 0) && (
                <VaultAssets
                  vault={vault}
                  depositedPrimary={depositedPrimary}
                  depositedSecondary={depositedSecondary}
                />
              )}
              <DepositInterface
                vault={vault}
                primaryAmount={primaryAmount}
                secondaryAmount={secondaryAmount}
                primaryBalance={primaryBalance}
                secondaryBalance={secondaryBalance}
                isLoadingBalances={isLoadingBalances}
                onPrimaryAmountChange={setPrimaryAmount}
                onSecondaryAmountChange={setSecondaryAmount}
                onPrimaryMaxClick={handlePrimaryMaxClick}
                onSecondaryMaxClick={handleSecondaryMaxClick}
                primaryAmountWithDecimals={primaryAmountWithDecimals}
                secondaryAmountWithDecimals={secondaryAmountWithDecimals}
                depositedPrimary={depositedPrimary}
                depositedSecondary={depositedSecondary}
                currentDepositId={depositedAssetsByUser?.depositId || 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
