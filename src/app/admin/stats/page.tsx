"use client"
import { useAccountContext } from "@/app/context/AccountContext";
import AdminSideBar from "@/components/Administration/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/* 
TODO ...
Dashboard customers interactions and smart contract status like balance, number of certicates.
TODO : Withdraw function for admin or founders
*/

export default function StatsAdminPage() {
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
         <AdminSideBar></AdminSideBar>
      </>
   );
}
