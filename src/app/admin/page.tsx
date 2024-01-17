"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AdminSideBar from "@/components/Administration/AdminSidebar";
import ConfirmationTable from "@/components/Administration/ConfirmationTable";
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [account]);

   return (
      <>
         <div className="flex flex-row w-screen full-height mt-2">
            <AdminSideBar />
            <div className="flex justify-self-center ml-44 mt-10 space-y-6">
               <ConfirmationTable />
            </div>
         </div>
      </>
   );
}
