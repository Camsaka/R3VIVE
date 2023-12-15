"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function LinkList() {
   const { address, isConnected, status } = useAccount();
   const [connectedBar, setConnectedBar] = useState(false);
   useEffect(() => {
      if (!isConnected) {
         setConnectedBar(false);
      } else{
         setConnectedBar(true);
      }
   }, [address, status, isConnected]);

   if (connectedBar) {
      return (
         <nav className="flex self-center justify-between">
            <ul className="space-x-28 flex">
               <li>
                  <Link href="/" className="hover:text-gray-500">
                     Accueil
                  </Link>
               </li>
               {/* <li>
                  <Link
                     href="/marketplace"
                     className="hover:text-gray-500"
                  >
                     Acheter une montre
                  </Link>
               </li>
               <li>
                  <Link
                     href="/vendre"
                     className="hover:text-gray-500"
                  >
                     Vendre une montre
                  </Link>
               </li> */}
               <li>
                  <Link
                     href="/aboutus"
                     className="hover:text-gray-500"
                  >
                     A propos de nous
                  </Link>
               </li>
               <li>
                  <Link
                     href="/certificat"
                     className="hover:text-gray-500"
                  >
                     Certificat
                  </Link>
               </li>
            </ul>
         </nav>
      );
   } else {
      return (
         <nav className="space-x-10">
            <ul className="space-x-28 flex">
               <li>
                  <Link href="/" className="hover:text-gray-500">
                     Accueil
                  </Link>
               </li>
               {/* <li>
                  <Link
                     href="/marketplace"
                     className="hover:text-gray-500"
                  >
                     Acheter une montre
                  </Link>
               </li> */}
               <li>
                  <Link
                     href="/aboutus"
                     className="hover:text-gray-500"
                  >
                     A propos de nous
                  </Link>
               </li>
            </ul>
         </nav>
      );
   }
}

export default LinkList;
