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

export async function sendConfirmationMail(
   data: FormDataR3,
   pictures: FileList | null
) {
   const apiEndpoint = "/api/email";
   const formData = new FormData();
   console.log(pictures);

   // Append the JSON data to the FormData
   Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
         formData.append(key, value);
         console.log(key, value)
      }
   });

   // Append pictures to the FormData
   if (pictures) {
      for (let i = 0; i < pictures.length; i++) {
         const picture = pictures[i];
         console.log(picture);
         formData.append("pictures", picture as Blob);
      }
   }
   try {
      const response = await fetch(apiEndpoint, {
         method: "POST",
         body: formData
      });

      if (!response.ok) {
         throw new Error(`Server responded with status ${response.status}`);
      }
      const result = await response.json();
      console.log(result); // Log the result from the server (e.g., success message or error)
   } catch (error: any) {
      console.error("Error sending data to the server:", error.message);
   }
}

export default { addTokenId, sendConfirmationMail };
