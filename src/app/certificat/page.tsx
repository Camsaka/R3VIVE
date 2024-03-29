"use client"

import AccountInfos from "@/components/Web3/AccountInfos";
import CertifRequestForm from "@/components/Web3/CertifRequestForm";
import MintingModal from "@/components/UserSpace/MintingModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* 
Request certif page.
*/

export default function Certificate() {

   const [requestStatus, setRequestStatus] = useState("");
   const [openModal, setOpenModal] = useState(false);
   const router = useRouter();
   const onClickAction= () => {
      router.push("/user-space/requests");
   }
   return (
      <div>
         <AccountInfos />
         <CertifRequestForm setRequestStatus={setRequestStatus} setOpenModal={setOpenModal} />
         <MintingModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalData={requestStatus}
            titleModal="Requete envoyée avec succès."
            onClickAction={onClickAction}
         ></MintingModal>
      </div>
   );
}
