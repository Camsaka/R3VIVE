"use client";
import { FileInput, Label, Select, Textarea, TextInput } from "flowbite-react";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { sendCertifRequest } from "@/utils/Mailing";
import getDates from "@/utils/Dates";
import { AccountContext } from "@/app/context/AccountContext";

/* 
Confirmation mintability form : Get form datas and send a mail to r3vive mail box to confirmed
All fields are required
Call mail sending from @utils 
*/
function CertifRequestForm() {
   const marques = ["Rolex", "Audemard Piguet", "Cartier", "Breitling"];
   const dates = getDates()!;
   const [requestStatus, setRequestStatus] = useState("");
   const router = useRouter();
   const account = useContext(AccountContext);

   async function submitCertificatForm(e: any) {
      e.preventDefault();
      // const { data } = await addTokenId();
      // const logs = data.logs[0];
      // const abi = [
      //    "event TokenAdd (address requester, uint256 tokenid, bool status)",
      // ];

      // let iface = new ethers.Interface(abi);
      // const address = iface.parseLog(logs)?.args.requester.toString();
      // const tokenid = iface.parseLog(logs)?.args.tokenid.toString();

      const dataToSubmit: FormData = new FormData(e.target);
      const address = account?.address || "0x";
      dataToSubmit.append("address", address);

      await sendCertifRequest(dataToSubmit)
         .then((res) => {
            setRequestStatus(
               "Nous avons bien reçu votre demande. Nous allons la traiter dans les plus bref délai."
            );
            const timer = setTimeout(() => {
               router.push("/");
            }, 7000);
            return () => {
               clearTimeout(timer);
            };
         })
         .catch((err) => {
            setRequestStatus(
               "Erreur lors de l'envoi du mail veuillez renouveler votre demande."
            );
         });
   }

   return (
      <div className="flex flex-col items-center text-white">
         <h1 className="text-4xl flex flex-col items-center">
            R3VIVE certificat
         </h1>
         <div className="flex flex-col items-center m-10 border-x p-4 w-3/4">
            <h1 className="flex mb-5">
               Demander votre certificat dés maintenant
            </h1>
            <form
               className="flex w-1/2 flex-col gap-4 items-left"
               encType="multipart/form-data"
               onSubmit={submitCertificatForm}
            >
               {/* email */}
               <div>
                  <div className="mb-2 block">
                     <Label
                        htmlFor="email"
                        value="email"
                        className="text-white"
                     />
                  </div>
                  <TextInput
                     id="email"
                     name="email"
                     type="email"
                     placeholder="Email"
                     required
                  />
               </div>
               {/* nom / modele */}
               <div>
                  <div className="mb-2 block">
                     <Label
                        htmlFor="name"
                        value="Name"
                        className="text-white"
                     />
                  </div>
                  <TextInput
                     id="name"
                     name="name"
                     type="text"
                     placeholder="Entrer le modèle de votre montre..."
                     required
                  />
               </div>

               {/* marque */}
               <div className="w-1/3">
                  <div className="mb-2 block">
                     <Label
                        htmlFor="brand"
                        value="Selectionner la marque"
                        className="text-white"
                     />
                  </div>
                  <Select id="brand" name="brand" defaultValue="none" required>
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
                        htmlFor="year"
                        value="Selectionner l'année"
                        className="text-white"
                     />
                  </div>
                  <Select id="year" name="year" defaultValue="none" required>
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
                        htmlFor="serialN"
                        value="Numero de serie"
                        className="text-white"
                     />
                  </div>
                  <Textarea
                     id="serialN"
                     name="serialN"
                     placeholder="Numero de série..."
                     required
                     rows={1}
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
                     name="description"
                     placeholder="Laissé une breve description de votre bien ..."
                     required
                     rows={3}
                  />
               </div>

               {/* historique */}
               <div className="w-full">
                  <div className="mb-2 block">
                     <Label
                        htmlFor="historic"
                        value="Historique"
                        className="text-white"
                     />
                  </div>
                  <Textarea
                     id="historic"
                     name="historic"
                     placeholder="Entrer le maximum d'information sur l'histoire de votre montre..."
                     required
                     rows={7}
                  />
               </div>

               {/* Photos */}
               <div id="fileUpload" className="max-w-md">
                  <div className="mb-2 block">
                     <Label
                        htmlFor="files"
                        value="Fichiers à fournir"
                        className="text-white"
                     />
                  </div>
                  <FileInput
                     id="files"
                     name="files"
                     accept="image/*"
                     required
                     multiple
                  />
               </div>
               <button
                  type="submit"
                  className="m-5 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
               >
                  Envoyer
               </button>
            </form>
            <p>{requestStatus}</p>
         </div>
      </div>
   );
}

export default CertifRequestForm;
