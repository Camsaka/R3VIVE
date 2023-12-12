import { writeContract } from "@wagmi/core";
import abi from "@/data/abiCertif.json";

async function addTokenId() {
   const hash = await writeContract({
      address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
      abi: abi,
      functionName: "addTokenInConfirmationList",
   })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
}

export default addTokenId;
