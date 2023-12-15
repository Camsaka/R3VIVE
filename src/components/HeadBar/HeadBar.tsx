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
      //tolowerCase
      if (address == ownerAddress && address != undefined) {
         setAdminAuth(true);
      } else {
         setAdminAuth(false);
      }
   }, [address]);

   if (!adminAuth) {
      return (
         <div className="flex flex-row bg-black text-white p-4 items-center border-solid border-b-2 border-b-stone-300 ">
            <div className="flex justify-start basis-32"><Logo w={50} h={50}></Logo></div>
            <div className="flex justify-start basis-3/4"><LinkList></LinkList></div>
            
            <div className="flex justify-end basis-1/4">
               <ConnectYourWalletButton />
            </div>
         </div>
      );
   } else {
      return (
         <div className="flex flex-row bg-black text-white p-4 items-center border-solid border-b-2 border-b-stone-300 ">
            <div className="flex justify-start basis-32"><Logo w={50} h={50}></Logo></div>
            <div className="flex justify-start basis-3/4"><LinkList></LinkList></div>
            
            <div className="flex justify-end basis-1/4">
               <AdminSpaceButton/>
               <ConnectYourWalletButton />
            </div>
         </div>
      );
   }
}

export default HeadBar;
