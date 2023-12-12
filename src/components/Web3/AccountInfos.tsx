"use client";
import { useEffect, useState } from "react";
import { resolveTripleslashReference } from "typescript";
import { useAccount } from "wagmi";
import { useBalance } from "wagmi";

function AccountInfos() {
   const { address, isConnecting, isDisconnected, status } = useAccount();
   const { data } = useBalance({ address: address});
   const [isClient, setIsClient] = useState(false);



   useEffect(() => {
      setIsClient(true);
   }, []);


   return (
      <div className="w-1/3 ml-10 mb-10 mt-10 p-2">
         {isClient && (
            <div >
               <p>Address : {address}</p>
               <p>Montant diponible : {data?.formatted} {data?.symbol}</p>
            </div>
         )}
      </div>
   );
}

export default AccountInfos;
