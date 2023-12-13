import { writeContract, readContract } from "@wagmi/core";
import abi from "@/data/abiCertif.json";
import {FormDataR3} from '../components/Web3/ContractInteractionBox'

export async function addTokenId() {
   const hash = await writeContract({
      address: process.env.NEXT_PUBLIC_CERTIF_CONTRACT_ADDRESS_SEPOLIA,
      abi: abi,
      functionName: "addTokenInConfirmationList",
   })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
}

export async function sendConfirmationMail(data : FormDataR3) {
   const apiEndpoint = '/api/email';

   fetch(apiEndpoint, {
     method: 'POST',
     body: JSON.stringify(data),
   })
     .then((res) => res.json())
     .then((response) => {
       alert(response.message);
     })
     .catch((err) => {
       alert(err);
     });
}

export default {addTokenId, sendConfirmationMail}
