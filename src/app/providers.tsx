"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "../wagmi";
import { Header } from "../components/Header";
import { TRPCReactProvider } from "~/trpc/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <Header />
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </TRPCReactProvider>
  );
};
