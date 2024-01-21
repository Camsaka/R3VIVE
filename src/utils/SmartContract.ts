import {
   writeContract,
   prepareWriteContract,
   waitForTransaction,
} from "@wagmi/core";
import abi from "@/data/abiCertif.json";

const addressContract = process.env.NEXT_PUBLIC_CERTIF_CONTRACT_ADDRESS_SEPOLIA;

export async function mintNFT(metadataURL : string) {
   const { request } = await prepareWriteContract({
      address: `0x${addressContract}`,
      abi: abi,
      functionName: "addTokenInConfirmationList",
   });
   const { hash } = await writeContract(request).then((res) => {
      return res;
   });
   const data = await waitForTransaction({
      hash,
   }).then((res) => {
      return res;
   });
   return { data };
}

const smartcontractsfunctions = {
   mintNFT
 }


export default smartcontractsfunctions;
