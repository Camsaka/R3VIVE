"use client";
import { useEffect, useState } from "react";
import { FileInput, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useContractEvent, useWebSocketPublicClient } from "wagmi";
import {
   sendConfirmationMail,
   addTokenId,
} from "../../utils/CertifInterractionMethods";
import abi from "@/data/abiCertif.json";

export type FormDataR3 = {
   name: string;
   brand: string;
   serialN: string;
   year: string;
   description: string;
   historic: string;
   picture: string;
};

function ContractInteractionBox() {
   const marques = ["Rolex", "Audemard Piguet", "Cartier", "Breitling"];
   const dates = getDates()!;
   const [requestStatus, setRequestStatus] = useState("");
   const addressContract =
      process.env.NEXT_PUBLIC_CERTIF_CONTRACT_ADDRESS_SEPOLIA;

   const [name, setName] = useState("");
   const [brand, setBrand] = useState("");
   const [serialN, setSerialN] = useState("");
   const [year, setYear] = useState("");
   const [description, setDescription] = useState("");
   const [historic, setHistoric] = useState("");

   function getDates() {
      const currentYear = new Date().getFullYear();
      const dates: Number[] = []!;
      for (let i = currentYear - 300; i <= currentYear; i++) {
         dates.push(i);
      }
      return dates.reverse();
   }

   async function submitCertificatForm() {
      // const res = await addTokenId();
      const data: FormDataR3 = {
         name: name,
         brand: brand,
         serialN: serialN,
         year: year,
         description: description,
         historic: historic,
         picture: "picture.png",
      };
      const resMail = await sendConfirmationMail(data);
      console.log("response to add token id :", resMail);
   }

   useContractEvent({
      address: addressContract,
      abi: abi,
      eventName: "TokenAdd",
      listener(event) {
         console.log("Event :", event);
         setRequestStatus("Request ok");
      },
   });

   useEffect(() => {
      // Additional logic or effects can be added here
   }, [requestStatus]);

   return (
      <div className="flex flex-col items-center">
         <h1 className="text-4xl flex flex-col items-center">
            R3VIVE certificat
         </h1>
         <div className="flex flex-col items-center m-10 border-x p-4 w-3/4">
            <h1 className="flex mb-5">
               Demander votre certificat dés maintenant
            </h1>
            <form
               className="flex w-1/2 flex-col gap-4 items-left"
               onSubmit={(e) => {
                  e.preventDefault();
                  submitCertificatForm();
               }}
            >
               {/* nom / modele */}
               <div>
                  <div className="mb-2 block">
                     <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput
                     id="small"
                     type="text"
                     placeholder="Entrer le modèle de votre montre..."
                     onChange={(e) => setName(e.target.value)}
                     required
                  />
               </div>

               {/* marque */}
               <div className="w-1/3">
                  <div className="mb-2 block">
                     <Label htmlFor="marques" value="Selectionner la marque" />
                  </div>
                  <Select
                     id="marques"
                     defaultValue="none"
                     required
                     onChange={(e) => setBrand(e.target.value)}
                  >
                     <option value="none" disabled hidden>
                        ---
                     </option>
                     {marques.map((value, index) => (
                        <option key={index}>{value}</option>
                     ))}
                  </Select>
               </div>

               {/* Annee de fabrication */}
               <div className="w-1/3">
                  <div className="mb-2 block">
                     <Label
                        htmlFor="yearOfFabrication"
                        value="Selectionner l'année"
                     />
                  </div>
                  <Select
                     id="yearOfFabrication"
                     defaultValue="none"
                     required
                     onChange={(e) => setYear(e.target.value)}
                  >
                     <option value="none" disabled hidden>
                        ---
                     </option>
                     {dates.map((value, index) => (
                        <option key={index}>{value.toString()}</option>
                     ))}
                  </Select>
               </div>

               {/* Numéro de série */}
               <div className="w-full">
                  <div className="mb-2 block">
                     <Label htmlFor="serialNumber" value="Numero de serie" />
                  </div>
                  <Textarea
                     id="serialNumber"
                     placeholder="Numero de série..."
                     required
                     rows={1}
                     onChange={(e) => setSerialN(e.target.value)}
                  />
               </div>

               {/* description */}
               <div className="w-full">
                  <div className="mb-2 block">
                     <Label htmlFor="description" value="Description" />
                  </div>
                  <Textarea
                     id="description"
                     placeholder="Laissé une breve description de votre bien ..."
                     required
                     rows={3}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </div>

               {/* historique */}
               <div className="w-full">
                  <div className="mb-2 block">
                     <Label htmlFor="history" value="Historique" />
                  </div>
                  <Textarea
                     id="history"
                     placeholder="Entrer le maximum d'information sur l'histoire de votre montre..."
                     required
                     rows={7}
                     onChange={(e) => setHistoric(e.target.value)}
                  />
               </div>

               {/* Photos */}
               <div id="fileUpload" className="max-w-md">
                  <div className="mb-2 block">
                     <Label htmlFor="file" value="Upload file" />
                  </div>
                  <FileInput id="file" required />
               </div>
               <button
                  type="submit"
                  className="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
               >
                  Envoyer
               </button>
            </form>
            <p>{requestStatus}</p>
         </div>
      </div>
   );
}

export default ContractInteractionBox;
