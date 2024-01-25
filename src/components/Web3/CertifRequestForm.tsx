"use client";
import {
   Button,
   FileInput,
   Select,
   Textarea,
   TextInput,
} from "flowbite-react";

import { useContext, useState } from "react";

import { sendCertifRequest } from "@/utils/requestsCertif";
import getDates from "@/utils/Dates";
import { AccountContext } from "@/app/context/AccountContext";
import LoadingSpinner from "../Animations/LoadingSpinner";

/* 
Confirmation mintability form : Get form datas and send a mail to r3vive mail box to confirmed
All fields are required
Call mail sending from @utils 
*/
function CertifRequestForm({
   setRequestStatus,
   setOpenModal,
}: {
   setRequestStatus: CallableFunction;
   setOpenModal: CallableFunction;
}) {
   const marques = ["Rolex", "Audemard Piguet", "Cartier", "Breitling"];
   const dates = getDates()!;
   const account = useContext(AccountContext);
   const [isDisableButton, setIsDisableButton] = useState(false);

   async function submitCertificatForm(e: any) {
      e.preventDefault();
      setIsDisableButton(true);
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
            setOpenModal(true);
         })
         .catch((err) => {
            setRequestStatus(
               "Erreur lors de l'envoi du mail veuillez renouveler votre demande."
            );
            setOpenModal(true);
         });
   }

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
               encType="multipart/form-data"
               onSubmit={submitCertificatForm}
            >
               {/* email */}
               <div>
                  <div className="mb-2 block">
                     <label htmlFor="email">Email</label>
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
                     <label htmlFor="name">Name</label>
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
                     <label htmlFor="brand">Selectionner la marque</label>
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
                     <label htmlFor="year">Selectionner l'année</label>
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
                     <label htmlFor="serialN">Numero de serie</label>
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
                     <label htmlFor="description">Description</label>
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
                     <label htmlFor="historic">Historique</label>
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
                     <label htmlFor="files">Fichiers à fournir</label>
                  </div>
                  <FileInput
                     id="files"
                     name="files"
                     accept="image/*"
                     required
                     multiple
                  />
               </div>
               <Button
                  className="px-10 flex flex-col mt-5 justify-self-end"
                  gradientMonochrome="cyan"
                  type="submit"
                  disabled={isDisableButton}
               >
                  {isDisableButton ? (
                     <>
                        <LoadingSpinner></LoadingSpinner>
                        <p className="ml-2">Envoi en cours...</p>
                     </>
                  ) : (
                     "Envoyer la requête"
                  )}
               </Button>
            </form>
         </div>
      </div>
   );
}

export default CertifRequestForm;
