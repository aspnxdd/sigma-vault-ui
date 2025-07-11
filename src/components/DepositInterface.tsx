import { useState } from "react";
import { validateAmount } from "../lib/utils";
import { TokenInput } from "./TokenInput";
import { useAccount, useWriteContract } from "wagmi";
import { tokenVaultAbi } from "~/lib/tokenVaultAbi";
import { Address, erc20Abi } from "viem";
import { config } from "~/wagmi";
import {
  readContracts,
  simulateContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

interface DepositInterfaceProps {
  vault: inferRouterOutputs<AppRouter>["euler"]["getPoolById"];
  primaryAmount: string;
  secondaryAmount: string;
  primaryBalance: number | null;
  secondaryBalance: number | null;
  isLoadingBalances?: boolean;
  onPrimaryAmountChange: (amount: string) => void;
  onSecondaryAmountChange: (amount: string) => void;
  onPrimaryMaxClick: () => void;
  onSecondaryMaxClick: () => void;
  primaryAmountWithDecimals: number;
  secondaryAmountWithDecimals: number;
  depositedPrimary?: number;
  depositedSecondary?: number;
  currentDepositId: number;
}

export const DepositInterface = ({
  vault,
  primaryAmount,
  secondaryAmount,
  primaryBalance,
  secondaryBalance,
  isLoadingBalances = false,
  onPrimaryAmountChange,
  onSecondaryAmountChange,
  onPrimaryMaxClick,
  onSecondaryMaxClick,
  primaryAmountWithDecimals,
  secondaryAmountWithDecimals,
  depositedPrimary = 0,
  depositedSecondary = 0,
  currentDepositId,
}: DepositInterfaceProps) => {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const { address, chainId } = useAccount();

  const isPrimaryValid =
    primaryAmount === "" || validateAmount(primaryAmount, primaryBalance);
  const isSecondaryValid =
    secondaryAmount === "" || validateAmount(secondaryAmount, secondaryBalance);

  const canDeposit =
    activeTab === "deposit" &&
    primaryAmount !== "" &&
    isPrimaryValid &&
    secondaryAmount !== "" &&
    isSecondaryValid;

  const canWithdraw =
    activeTab === "withdraw" &&
    (depositedPrimary > 0 || depositedSecondary > 0);

  const writeIncreaseAllowance = useWriteContract();
  const deposit = useWriteContract();
  const withdraw = useWriteContract();

  const handleDeposit = async () => {
    if (!primaryAmountWithDecimals || !secondaryAmountWithDecimals) {
      console.error("Invalid amount");
      return;
    }
    if (!address) {
      console.error("No wallet address found");
      return;
    }

    if (!chainId || chainId == null) {
      console.error("No chain ID found");
      return;
    }

    const contract = "0xdc5Fc954B1Ae78A9a134A21bEcC5A2477b2be848";
    const [allowance0, allowance1] = await readContracts(config, {
      contracts: [
        {
          address: vault.token0.id as Address,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address as Address, contract as Address],
        },
        {
          address: vault.token1.id as Address,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address as Address, contract as Address],
        },
      ],
    });

    if (allowance0.error || allowance1.error) {
      console.error("Failed to get allowance");
      return;
    }

    const tokenAllowance0 = Number(allowance0.result);
    const tokenAllowance1 = Number(allowance1.result);

    const needsApproval0 = tokenAllowance0 < BigInt(primaryAmountWithDecimals);
    const needsApproval1 =
      tokenAllowance1 < BigInt(secondaryAmountWithDecimals);

    if (needsApproval0) {
      const approveTransaction0 =
        await writeIncreaseAllowance.writeContractAsync({
          address: vault.token0.id as Address,
          abi: erc20Abi,
          functionName: "approve",
          args: [contract as Address, BigInt(primaryAmountWithDecimals)],
          chainId,
        });

      const { status } = await waitForTransactionReceipt(config, {
        hash: approveTransaction0,
        chainId: chainId as 1,
      });
      if (status === "reverted") {
        console.error("Failed to approve tokens");
      }
    }

    if (needsApproval1) {
      const approveTransaction1 =
        await writeIncreaseAllowance.writeContractAsync({
          address: vault.token1.id as Address,
          abi: erc20Abi,
          functionName: "approve",
          args: [contract as Address, BigInt(secondaryAmountWithDecimals)],
          chainId,
        });

      const { status } = await waitForTransactionReceipt(config, {
        hash: approveTransaction1,
        chainId: chainId as 1,
      });
      if (status === "reverted") {
        console.error("Failed to approve tokens");
      }
    }
    const simulateCreateVesting = await simulateContract(config, {
      address: contract as Address,
      abi: tokenVaultAbi,
      functionName: "deposit",
      args: [
        vault.token0.id as Address,
        BigInt(primaryAmountWithDecimals),
        vault.token1.id as Address,
        BigInt(secondaryAmountWithDecimals),
      ],
      chainId: chainId as 1,
    });
    if (simulateCreateVesting.request) {
      await deposit.writeContractAsync(simulateCreateVesting.request);
    }
  };

  const handleWithdraw = async () => {
    if (!address) {
      console.error("No wallet address found");
      return;
    }

    if (!chainId || chainId == null) {
      console.error("No chain ID found");
      return;
    }

    const contract = "0xdc5Fc954B1Ae78A9a134A21bEcC5A2477b2be848";

    const simulateCreateVesting = await simulateContract(config, {
      address: contract as Address,
      abi: tokenVaultAbi,
      functionName: "withdraw",
      args: [BigInt(currentDepositId)],
      chainId: chainId as 1,
    });
    if (simulateCreateVesting.request) {
      await withdraw.writeContractAsync(simulateCreateVesting.request);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Tab Navigation */}
      <div className="flex p-1 bg-gray-800/50 rounded-xl">
        <button
          onClick={() => setActiveTab("deposit")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "deposit"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Deposit
        </button>
        <button
          onClick={() => setActiveTab("withdraw")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "withdraw"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Withdraw
        </button>
      </div>

      <div className="space-y-4">
        <h4 className="mb-3 text-sm font-medium text-gray-300">
          {activeTab === "deposit" ? "Deposit Amount" : "Withdraw Amount"}
        </h4>

        <TokenInput
          token={{
            image: "🟡",
            name: vault.token0.symbol,
            symbol: vault.token0.symbol,
          }}
          amount={
            activeTab === "withdraw"
              ? depositedPrimary.toString()
              : primaryAmount
          }
          balance={activeTab === "withdraw" ? depositedPrimary : primaryBalance}
          isValid={activeTab === "withdraw" ? true : isPrimaryValid}
          isPrimary={true}
          isLoadingBalance={isLoadingBalances}
          readonly={activeTab === "withdraw"}
          onAmountChange={
            activeTab === "withdraw" ? () => {} : onPrimaryAmountChange
          }
          onMaxClick={activeTab === "withdraw" ? () => {} : onPrimaryMaxClick}
        />

        {/* Plus Icon */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <span className="text-lg font-bold text-white">+</span>
          </div>
        </div>

        <TokenInput
          token={{
            image: "🔵",
            name: vault.token1.symbol,
            symbol: vault.token1.symbol,
          }}
          amount={
            activeTab === "withdraw"
              ? depositedSecondary.toString()
              : secondaryAmount
          }
          balance={
            activeTab === "withdraw" ? depositedSecondary : secondaryBalance
          }
          isValid={activeTab === "withdraw" ? true : isSecondaryValid}
          isPrimary={false}
          isLoadingBalance={isLoadingBalances}
          readonly={activeTab === "withdraw"}
          onAmountChange={
            activeTab === "withdraw" ? () => {} : onSecondaryAmountChange
          }
          onMaxClick={activeTab === "withdraw" ? () => {} : onSecondaryMaxClick}
        />
      </div>

      <button
        onClick={() => {
          if (canDeposit && activeTab === "deposit") {
            handleDeposit();
          }
          if (canWithdraw && activeTab === "withdraw") {
            handleWithdraw();
          }
        }}
        disabled={activeTab === "deposit" ? !canDeposit : !canWithdraw}
        className={`w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg ${
          (activeTab === "deposit" ? canDeposit : canWithdraw)
            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white hover:scale-105 shadow-blue-500/25"
            : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
        }`}
      >
        {activeTab === "deposit"
          ? canDeposit
            ? "Deposit"
            : "Enter amounts to deposit"
          : canWithdraw
          ? "Withdraw All"
          : "No deposited assets to withdraw"}
      </button>
    </div>
  );
};
