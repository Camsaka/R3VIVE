"use client";
import LinkList from "./LinkList";
import Logo from "../Logo";
import ConnectYourWalletButton from "../Web3/ConnectYourWalletButton";
import AdminSpaceButton from "./AdminSpaceButton";
import ThemeSwitcher from "@/components/Navbar/ThemeSwitcher";

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
      <nav className="flex flex-row bg-gray-800 text-white items-center h-20 fixed w-screen z-50 mt-0">
         <div className="flex justify-start ml-5 mr-20">
            <Logo w={50} h={50}></Logo>
         </div>
         <div className="flex justify-start basis-3/4">
            {account && <LinkList isConnected={account.isConnected}></LinkList>}
         </div>
         <ThemeSwitcher />
         <div className="flex justify-end basis-1/4 mr-4">
            {account &&
               account.isConnected &&
               account.address == ownerAddress && <AdminSpaceButton />}
            <ConnectYourWalletButton />
         </div>
      </nav>
   );
}

export default NavBar;
