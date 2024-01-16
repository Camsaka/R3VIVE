// /src/admin/request/[id]/page.tsx
import {
   getAllRequestsActiveServerSide,
   getRequestById,
} from "@/utils/requestsCertif";
import { Button } from "flowbite-react";
import ValidationButton from "@/components/Administration/ButtonValidation";

export const dynamicParams = false;
export async function generateStaticParams() {
   try {
      const requests = await getAllRequestsActiveServerSide();
      const data = await requests.json();
      if (Array.isArray(data)) {
         return data.map((request) => ({
            id: request.id,
         }));
      }
   } catch (error) {
      console.error("Error in generateStaticParams:", error);
   }
}

export default async function RequestDetailPage({
   params: { id },
}: {
   params: {
      id: string;
   };
}) {
   const request = await getRequestById(id);
   const data = await request.json();
   return (
      <div>
         <p>ID : {id}</p>
         <p>Email : {data.email}</p>
         <p>Name : {data.name}</p>
         <p>Marque : {data.brand}</p>
         <p>Année : {data.year}</p>
         <p>Numero de serie{data.serialn}</p>
         <p>Description: {data.description}</p>
         <p>Historique : {data.historic}</p>
         <p>Address du propriétaire : {data.address}</p>
         <p>Date de la requete : {data.dateofcreation}</p>
         <div className="flex flex-row justify-center space-x-8 mt-10">
            <ValidationButton identifiant={id} />
            <Button gradientMonochrome="failure">Rejeter</Button>
         </div>
      </div>
   );
}
