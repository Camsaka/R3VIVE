import { writeContract, readContract } from "@wagmi/core";
import abi from "@/data/abiCertif.json";

async function addTokenId() {
   const hash = await writeContract({
      address: process.env.NEXT_PUBLIC_CERTIF_CONTRACT_ADDRESS_SEPOLIA,
      abi: abi,
      functionName: "addTokenInConfirmationList",
   })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
}

async function getOwner() {
   await readContract({
      address: process.env.NEXT_PUBLIC_CERTIF_CONTRACT_ADDRESS_SEPOLIA,
      abi: abi,
      functionName: "owner",
   });
}

export default addTokenId;
