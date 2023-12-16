import {
   writeContract,
   readContract,
   fetchTransaction,
   prepareWriteContract,
   waitForTransaction,
} from "@wagmi/core";
import abi from "@/data/abiCertif.json";
import { FormDataR3 } from "../components/Web3/ContractInteractionBox";

const addressContract = process.env.NEXT_PUBLIC_CERTIF_CONTRACT_ADDRESS_SEPOLIA;

export async function addTokenId() {
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
   return { hash, data };
}

export async function sendConfirmationMail(data: FormDataR3, pictures: File[]) {
   const apiEndpoint = "/api/email";
   console.log(pictures);

   const formData = new FormData();
   formData.append("name", data.name);
   formData.append("brand", data.brand);
   formData.append("year", data.year);
   formData.append("serialN", data.serialN);
   formData.append("description", data.description);
   formData.append("historic", data.historic);
   formData.append("address", data.address);
   formData.append("tokenid", data.tokenid);
   for (let i = 0; i < pictures.length; i++) {
      formData.append("files", pictures[i]);  
   }
   

   await fetch("/api/send-mail", {
      method: "POST",
      body: formData,
   });
}

export default { addTokenId, sendConfirmationMail };
