"use client"
import { validateRequest } from "@/utils/requestsCertif";
import { Button } from "flowbite-react";

/* Lateral menu for admin interface */

async function validateReq(id: string | undefined) {
   try {
      const r = await validateRequest(id);
      const data = await r.json();
      console.log(data, `La requete d'id ${id} a bien été validée`);
   } catch (error) {
      console.error("Error in validateReq", error);
   }
}
function ValidationButton(props : { identifiant: string; }) {
   return (
      <Button gradientMonochrome="success" onClick={() => validateReq(props.identifiant)}>
         Accepter
      </Button>
   );
}

export default ValidationButton;
