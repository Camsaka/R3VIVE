"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AdminSideBar from "@/components/Administration/AdminSidebar";
import ConfirmationForm from "@/components/Administration/ConfirmationForm";
import { useAccountContext } from "../context/AccountContext";

/* 
Admin confirmation token page. 
Can fill the form and confirmed request datas and available mintability of the certificate token
*/

export default function AdminPage() {
   const router = useRouter();
   //SEPOLIA
   const ownerAddress = process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY_TESTNET;
   const account = useAccountContext();
   useEffect(() => {
      if (account?.address != ownerAddress) router.push("/");
   }, [account]);

   return (
      <>
         <div className="flex flex-row w-screen full-height mt-2">
            <AdminSideBar />
            <ConfirmationForm />
         </div>
      </>
   );
}
