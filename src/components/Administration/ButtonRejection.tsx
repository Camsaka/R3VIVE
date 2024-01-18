"use client";
import { rejectRequest } from "@/utils/requestsCertif";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

/* Lateral menu for admin interface */

async function rejectReq(id: string | undefined) {
   try {
      const r = await rejectRequest(id);
      const data = await r.json();
   } catch (error) {
      console.error("Error in validateReq", error);
   }
}
function ButtonValidation(props: { identifiant: string }) {
   const router = useRouter();
   return (
      <Button
         gradientMonochrome="failure"
         onClick={() => {
            rejectReq(props.identifiant);
            router.push("/admin");
         }}
      >
         Accepter
      </Button>
   );
}

export default ButtonValidation;
