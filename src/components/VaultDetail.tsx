"use client";

import Link from "next/link";
import { useState } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { Address, erc20Abi } from "viem";
import { VaultDetailProps } from "../lib/types";
import { getVaultData } from "../lib/utils";
import { VaultHeader } from "./VaultHeader";
import { VaultMetrics } from "./VaultMetrics";
import { VaultAssets } from "./VaultAssets";
import { DepositInterface } from "./DepositInterface";
import { VaultPerformanceChart } from "./VaultDetailsSection";

export const VaultDetail = ({ vaultId }: VaultDetailProps) => {
  const [primaryAmount, setPrimaryAmount] = useState("");
  const [secondaryAmount, setSecondaryAmount] = useState("");

  const vaultData = getVaultData();
  const vault = vaultData[vaultId];

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
              address: vault.tokens.primary.address as Address,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [address!],
              chainId,
            },
            {
              address: vault.tokens.primary.address as Address,
              abi: erc20Abi,
              functionName: "decimals",
              chainId,
            },
            {
              address: vault.tokens.secondary.address as Address,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [address!],
              chainId,
            },
            {
              address: vault.tokens.secondary.address as Address,
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

  if (!vault) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">
            Vault Not Found
          </h1>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Dashboard
        </Link>
      </div>
      <div className="bg-gradient-to-br from-gray-900/60 via-slate-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl shadow-black/20 overflow-hidden mb-8">
        <div className="p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch min-h-[600px]">
            <div className="lg:col-span-2 flex flex-col">
              <VaultHeader vault={vault} />
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {vault.description}
              </p>
              <VaultMetrics vault={vault} />
              <div className="mt-8 flex-1">
                <VaultPerformanceChart />
              </div>
            </div>
            <div className="lg:col-span-1">
              <VaultAssets vault={vault} />
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
