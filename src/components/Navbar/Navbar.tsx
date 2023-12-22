"use client";
import LinkList from "./LinkList";
import Logo from "../Logo";
import ConnectYourWalletButton from "../Web3/ConnectYourWalletButton";
import AdminSpaceButton from "./AdminSpaceButton";
import { useAccountContext } from "@/app/context/AccountContext";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

/* 
Navbar of the application.
Changes depends on simple user or admin connection.
*/

function NavBar() {
   const accountContext = useAccountContext();

   const [account, setAccount] = useState<
      ReturnType<typeof useAccount> | undefined
   >(undefined);

   useEffect(() => {
      setAccount(accountContext);
   }, [accountContext]);

   const ownerAddress = process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY_TESTNET;
   return (
      <div className="flex flex-row bg-black text-white p-4 items-center border-solid border-b-2 border-b-stone-300  ">
         <div className="flex justify-start basis-32">
            <Logo w={50} h={50}></Logo>
         </div>
         <div className="flex justify-start basis-3/4">
            {account && (
               <LinkList isConnected={account.isConnected}></LinkList>
            )}
         </div>
         <div className="flex justify-end basis-1/4">
            {account && account.isConnected && account.address == ownerAddress && (
               <AdminSpaceButton />
            )}
            <ConnectYourWalletButton />
         </div>
      </div>
   );
}

export default NavBar;
