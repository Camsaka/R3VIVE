import React from "react";
import {
   EthereumClient,
   w3mConnectors,
   w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { createWeb3Modal } from "@web3modal/wagmi/react";

type WagmiProviderProps = {
   children: React.ReactNode;
};

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

function WagmiProvider({ children }: WagmiProviderProps) {
   return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

export default WagmiProvider;
