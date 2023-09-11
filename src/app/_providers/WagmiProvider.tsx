import {
   EthereumClient,
   w3mConnectors,
   w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";

type WagmiProviderType = {
   children: React.ReactNode;
};

const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = process.env.NEXT_PUBLIC_W3C_PID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
   autoConnect: true,
   connectors: w3mConnectors({ projectId, chains }),
   publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);
function WagmiProvider({ children }: WagmiProviderType) {
   return (
      <>
         <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
         <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
   );
}

export default WagmiProvider;
