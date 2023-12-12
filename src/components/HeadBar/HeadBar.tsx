"use client";
import React, { useEffect, useState } from "react";
import LinkList from "./LinkList";
import Logo from "../Logo";
import ConnectYourWalletButton from "../Web3/ConnectYourWalletButton";
import AdminSpaceButton from "./AdminSpaceButton";
import { useAccount } from "wagmi";

function HeadBar() {
   const { address, isConnecting, isDisconnected, status } = useAccount();
   const ownerAddress = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY_LOCALHOST;
   const [adminAuth, setAdminAuth] = useState(false);

   useEffect(() => {
      if (address?.toLowerCase() == ownerAddress) {
         console.log("equal");
         setAdminAuth(true);
      } else {
         console.log("not equal");
         setAdminAuth(false);
      }
   }, [address, status, ownerAddress]);

   if (!adminAuth) {
      return (
         <div className="grid grid-flow-col bg-black text-white p-4 items-center border-solid border-b-2 border-b-stone-300 ">
            <div className="flex justify-self-start"><Logo w={50} h={50}></Logo></div>
            <div className="flex justify-self-center"><LinkList></LinkList></div>
            
            <div className="flex justify-self-end">
               <ConnectYourWalletButton />
            </div>
         </div>
      );
   } else {
      return (
         <div className="grid grid-flow-col bg-black text-white p-4 items-center border-solid border-b-2 border-b-stone-300 ">
            <div className="flex justify-self-start"><Logo w={50} h={50}></Logo></div>
            <div className="flex justify-self-center"><LinkList></LinkList></div>
            
            <div className="flex justify-self-end">
               <AdminSpaceButton />
               <ConnectYourWalletButton />
            </div>
         </div>
      );
   }
}

export default HeadBar;
