"use client";
import { useAccount } from "wagmi";
import HeadBar from "../HeadBar/HeadBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AdminValidationToken() {
   const { address, isConnecting, isDisconnected, status } = useAccount();

   // LOCAL
   // const ownerAddress = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY_LOCALHOST;

   //SEPOLIA
   const ownerAddress = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY_TESTNET
   
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

   const router = useRouter();
   if (adminAuth) {
      return (
         <>
            <HeadBar />
            <p> connected avec adresse owner</p>
         </>
      );
   } else {
      return (
         <>
            <HeadBar />
            <div
            className="flex flex-col items-center mt"
               onMouseMove={() =>
                  setTimeout(() => {
                     router.push("/");
                  }, 3000)
               }
            >
               <p>
                  501 vous n&apos;êtes pas autorisé à accéder a cet espace...
               </p>
            </div>
         </>
      );
   }
}

export default AdminValidationToken;
