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
      <>
         {isClient && (
            <div className="flex flex-col place-items-center w-1/3 border-solid border-4 border-black rounded-lg mx-auto mb-10">
               <p>address : {address}</p>
               <p>{status}</p>
               <p>{data?.formatted} {data?.symbol}</p>
            </div>
         )}
      </>
   );
}

export default AccountInfos;
