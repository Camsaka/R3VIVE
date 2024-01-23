import {
   writeContract,
   prepareWriteContract,
   waitForTransaction,
} from "@wagmi/core";
import abi from "@/data/abiCertif.json";
import { parseEther } from "viem";
import { ethers } from "ethers";

const addressContract = process.env.NEXT_PUBLIC_CERTIF_CONTRACT_ADDRESS_SEPOLIA;
const NFTContractAddress = `0x${addressContract}`;
const NFTContractAbi = abi; // Replace with the actual ABI of your NFT contract
const provider = new ethers.providers.JsonRpcProvider(
   "https://sepolia.infura.io/v3/985017d2723145999c1a3775cbd0b059"
);
const nftContract = new ethers.Contract(
   NFTContractAddress,
   NFTContractAbi,
   provider
);

export async function mintNFT(metadataURL: string, address: string) {
   const { request } = await prepareWriteContract({
      address: `0x${addressContract}`,
      abi: abi,
      functionName: "mint",
      args: [address, metadataURL],
      value: parseEther("0.01"),
   });
   const { hash } = await writeContract(request).then((res) => {
      return res;
   });
   const data = await waitForTransaction({
      hash,
   }).then(async (res) => {

      return res;
   });
   return { data };
}

export async function getNFTMetadata(id: Number) {
   const tokenId = id;
   const tokenURI = await nftContract.tokenURI(tokenId);
   const response = await fetch(tokenURI);
   const metadata = await response.json();
   return metadata;
}

const smartcontractsfunctions = {
   mintNFT,
};

export default smartcontractsfunctions;
