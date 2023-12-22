"use client";
import { useAccountContext } from "@/app/context/AccountContext";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useBalance } from "wagmi";

/* 
Box to display connected account infos.
*/
function AccountInfos() {
   const accountContext = useAccountContext();

   const [account, setAccount] = useState<
      ReturnType<typeof useAccount> | undefined
   >(undefined);

   useEffect(() => {
      setAccount(accountContext);
   }, [accountContext]);

   const {data} = useBalance({address : account?.address});


   return (
      <div className="w-1/3 ml-10 mb-10 mt-10 p-2">
         {account?.address != undefined && (
            <div >
               <p>Address : {account?.address}</p>
               <p>Montant diponible : {data?.formatted} {data?.symbol}</p>
            </div>
         )}
         {account?.address == undefined && (
            <div >
               <p>Connecté un wallet pour faire votre demande</p>

            </div>
         )}
      </div>
   );
}

export default AccountInfos;
