"use client";
import { validateRequest } from "@/utils/requestsCertif";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

/* Lateral menu for admin interface */

async function validateReq(id: string | undefined) {
   try {
      const r = await validateRequest(id);
      const data = await r.json();
   } catch (error) {
      console.error("Error in validateReq", error);
   }
}
function ButtonValidation(props: { identifiant: string }) {
   const router = useRouter();
   return (
      <Button
         gradientMonochrome="success"
         onClick={() => {
            validateReq(props.identifiant);
            router.push("/admin");
         }}
      >
         Accepter
      </Button>
   );
}

export default ButtonValidation;
