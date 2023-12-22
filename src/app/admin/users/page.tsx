"use client"
import { useAccountContext } from "@/app/context/AccountContext";
import AdminSideBar from "@/components/Administration/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/* 
TODO ...
List all users and more infos about certificates owned, how many...
*/


export default function adminPage() {
   const router = useRouter();
   //SEPOLIA
   const ownerAddress = process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY_TESTNET;
   const account = useAccountContext();
   useEffect(() => {
      if (account?.address != ownerAddress) router.push("/");
   }, [account]);
   return (
      <>
         <AdminSideBar></AdminSideBar>
      </>
   )
}