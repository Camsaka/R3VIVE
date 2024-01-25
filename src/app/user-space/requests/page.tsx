"use client"
import AccountInfos from "@/components/Web3/AccountInfos";
import ListOfRequests from "@/components/UserSpace/ListOfRequests";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MintingModal from "@/components/UserSpace/MintingModal";

/* 
Request certif page.
*/

export default function Certificate() {
   const [requestStatus, setRequestStatus] = useState("");
   const [openModal, setOpenModal] = useState(false);
   const router = useRouter();
   const onClickAction = () => {
      router.push("/user-space/certificats");
   };
   return (
      <div className="flex flex-col">
         <AccountInfos />
         <p className=" my-12 text-2xl text-center">Mes requetes</p>
         <ListOfRequests setMintStatus={setRequestStatus} setOpenModal={setOpenModal} />
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
