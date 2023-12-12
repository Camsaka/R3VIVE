import React from "react";
import {
   EthereumClient,
   w3mConnectors,
   w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, localhost} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "@wagmi/core/providers/infura";

type WagmiProviderProps = {
   children: React.ReactNode;
};

const projectId = process.env.NEXT_PUBLIC_W3C_PID;

if (!projectId) {
   throw new Error("NEXT_PUBLIC_W3C_PID is not defined.");
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
   [localhost],
   [publicProvider()],
   // [infuraProvider({ apiKey: "985017d2723145999c1a3775cbd0b059" })]
);
const wagmiConfig = createConfig({
   autoConnect: true,
   connectors: w3mConnectors({chains : [localhost], projectId}),
   publicClient,
   webSocketPublicClient
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

function WagmiProvider({ children }: WagmiProviderProps) {
   return (
      <>
         <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
         <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
   );
}

export default WagmiProvider;
