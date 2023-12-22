"use client"
import React from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import {ProviderProps} from "@/types/types"

/* 
Wagmi provider for web3modal and blockchain node provider 
*/



const projectId = process.env.NEXT_PUBLIC_W3C_PID;

if (!projectId) {
   throw new Error("NEXT_PUBLIC_W3C_PID is not defined.");
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
   [sepolia],
   [
      // publicProvider(),
      infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY || "" }),
   ]
);

const metadata = {
   name: "R3VIVE",
   description: "Projet perso",
};

const wagmiConfig = createConfig({
   autoConnect: true,
   connectors: [
      new WalletConnectConnector({
         chains,
         options: { projectId, showQrModal: false, metadata },
      }),
      new InjectedConnector({ chains }),
   ],
   publicClient,
   webSocketPublicClient,
});

createWeb3Modal({ wagmiConfig, projectId, chains });

function WagmiProvider({ children }: ProviderProps) {
   return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

export default WagmiProvider;
