import {
   Button,
   FileInput,
   Label,
   Select,
   Textarea,
   TextInput,
} from "flowbite-react";

import { useState } from "react";
import { FormDataR3Validation } from "@/types/types";

import { confirmedTokenId } from "@/utils/SmartContract";
import { uploadPicture, uploadMetadata } from "@/utils/IPFS";
import getDates from "@/utils/Dates";

/* 
Certificate request formular 
All fields are required
Call IPFS methods and confirmed token functions from @/utils 
*/

function ConfirmationForm() {
   const [name, setName] = useState("");
   const [brand, setBrand] = useState("");
   const [serialN, setSerialN] = useState("");
   const [year, setYear] = useState("");
   const [description, setDescription] = useState("");
   const [historic, setHistoric] = useState("");
   const [address, setAddress] = useState("");
   const [tokenid, setTokenid] = useState("");
   const [picture, setPicture] = useState<File | null>(null);

   const marques = ["Rolex", "Audemard Piguet", "Cartier", "Breitling"];
   const dates = getDates()!;

   function handleUploadPicture(e: any) {
      const photo = e.target.files;
      setPicture(photo);
   }

   async function submitValidation() {
      try {
         const dataToUpload: FormDataR3Validation = {
            name: name,
            brand: brand,
            serialN: serialN,
            year: year,
            description: description,
            historic: historic,
            address: address,
            tokenid: tokenid,
         };
         await uploadPicture(picture);
         await uploadMetadata(dataToUpload)
         await confirmedTokenId(address, tokenid);
      } catch{}
   }

   return (
      <div className="flex flex-col items-center p-4 w-2/3 ml-20">
         <h1>Verification et mintable (ADMIN SPACE)</h1>
         <form
            className="flex w-1/2 flex-col gap-4 items-left"
            encType="multipart/form-data"
            onSubmit={(e) => {
               e.preventDefault();
               submitValidation();
            }}
         >
            {/* nom / modele */}
            <div>
               <div className="mb-2 block">
                  <Label htmlFor="name" value="Nom" className="text-white" />
               </div>
               <TextInput
                  id="name"
                  type="text"
                  placeholder="Entrer le modèle de votre montre..."
                  onChange={(e) => setName(e.target.value)}
                  required
               />
            </div>

            {/* marque */}
            <div className="w-1/3">
               <div className="mb-2 block">
                  <Label
                     htmlFor="marques"
                     value="Selectionner la marque"
                     className="text-white"
                  />
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
                     className="text-white"
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
                  <Label
                     htmlFor="serialNumber"
                     value="Numero de serie"
                     className="text-white"
                  />
               </div>
               <Textarea
                  id="serialNumber"
                  placeholder="Numero de série"
                  required
                  rows={1}
                  onChange={(e) => setSerialN(e.target.value)}
               />
            </div>

            {/* description */}
            <div className="w-full">
               <div className="mb-2 block">
                  <Label
                     htmlFor="description"
                     value="Description"
                     className="text-white"
                  />
               </div>
               <Textarea
                  id="description"
                  placeholder="Decrire"
                  required
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
               />
            </div>

            {/* historique */}
            <div className="w-full">
               <div className="mb-2 block">
                  <Label
                     htmlFor="history"
                     value="Historique"
                     className="text-white"
                  />
               </div>
               <Textarea
                  id="history"
                  placeholder="Entrer le maximum d'information sur l'histoire de la montre"
                  required
                  rows={7}
                  onChange={(e) => setHistoric(e.target.value)}
               />
            </div>

            {/* Address */}
            <div>
               <div className="mb-2 block">
                  <Label
                     htmlFor="address"
                     value="Address(0x...)"
                     className="text-white"
                  />
               </div>
               <TextInput
                  type="text"
                  id="address"
                  placeholder="Adresse du recepteur"
                  required
                  onChange={(e) => setAddress(e.target.value)}
               />
            </div>

            {/* TokenId */}
            <div>
               <div className="mb-2 block">
                  <Label
                     htmlFor="tokenid"
                     value="Token ID"
                     className="text-white"
                  />
               </div>
               <TextInput
                  type="text"
                  id="tokenid"
                  placeholder="Id du token"
                  required
                  onChange={(e) => setTokenid(e.target.value)}
               />
            </div>

            {/* Photo */}
            <div id="fileUpload" className="max-w-md">
               <div className="mb-2 block">
                  <Label
                     htmlFor="file"
                     value="Fichiers à fournir"
                     className="text-white"
                  />
               </div>
               <FileInput id="file" onChange={handleUploadPicture} required />
            </div>
            <Button type="submit" gradientDuoTone="pinkToOrange">
               Valider et upload IPFS
            </Button>
         </form>
      </div>
   );
}

export default ConfirmationForm;
