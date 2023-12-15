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
   const ownerAddress = process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY_TESTNET;
   
   const [adminAuth, setAdminAuth] = useState(false);

   useEffect(() => {
      //address.toLowerCase en local
      if (address == ownerAddress) {
         setAdminAuth(true);
      } else {
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
            className="flex flex-col items-center mt h-screen w-screen"
               onMouseMove={() =>
                  setTimeout(() => {
                     router.push("/");
                  }, 3000)
               }
            >
            </div>
         </>
      );
   }
}

export default AdminValidationToken;
