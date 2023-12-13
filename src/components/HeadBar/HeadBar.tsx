"use client";
import React, { useEffect, useState } from "react";
import LinkList from "./LinkList";
import Logo from "../Logo";
import ConnectYourWalletButton from "../Web3/ConnectYourWalletButton";
import AdminSpaceButton from "./AdminSpaceButton";
import { useAccount } from "wagmi";

function HeadBar() {
   const { address, isConnecting, isDisconnected, status } = useAccount();
   const ownerAddress = process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY_TESTNET;
   const [adminAuth, setAdminAuth] = useState(false);

   useEffect(() => {
      //tolowerCase for localhost
      if (address == ownerAddress && address != undefined) {
         console.log("equal", address, ownerAddress);
         setAdminAuth(true);
      } else {
         console.log("not equal", address, ownerAddress);
         setAdminAuth(false);
      }
   }, [address]);

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
