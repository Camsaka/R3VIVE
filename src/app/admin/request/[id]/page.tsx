// /src/admin/request/[id]/page.tsx
import {
   getRequestById,
} from "@/utils/requestsCertif";
import { Button } from "flowbite-react";
import ValidationButton from "@/components/Administration/ButtonValidation";

export default async function RequestDetailPage({
   params,
}: {
   params: { id: string };
}) {
   const id = params.id;
   const request = await getRequestById(id).then((res) => res.json());
   return (
      <div>
         <p>ID : {id}</p>
         <p>Email : {request.email}</p>
         <p>Name : {request.name}</p>
         <p>Marque : {request.brand}</p>
         <p>Année : {request.year}</p>
         <p>Numero de serie : {request.serialn}</p>
         <p>Description : {request.description}</p>
         <p>Historique : {request.historic}</p>
         <p>Address du propriétaire : {request.address}</p>
         <p>Date de la requete : {request.dateofcreation}</p>
         <div className="flex flex-row justify-center space-x-8 mt-10">
            <ValidationButton identifiant={id} />
            <Button gradientMonochrome="failure">Rejeter</Button>
         </div>
      </div>
   );
}
