/* eslint-disable @next/next/no-img-element */
// /src/admin/request/[id]/page.tsx
import { getAllRequestsActiveServerSide, getRequestById } from "@/utils/requestsCertif";
import ButtonValidation from "@/components/Administration/ButtonValidation";
import ButtonRejection from "@/components/Administration/ButtonRejection";


//(default): Dynamic segments not included in generateStaticParams are generated on demand.
export const dynamicParams = true

//generate static parameters "id" for each request loaded
export async function generateStaticParams() {
   const requests = await getAllRequestsActiveServerSide().then((res) =>
      res.json()
   );
   return requests.map((request: { id: string }) => ({
      id: request.id,
   }));
}

export default async function RequestDetailPage({
   params,
}: {
   params: { id: string };
}) {
   const id = params.id;
   const request = await getRequestById(id).then((res) => res.json());
   const images = request.images
   return (
      <div className="m-10">
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
         <div className="flex justify-stretch">
            {images && images.map((image: any, index: any) => (
               <img key={index} className="mt-5 h-28" src={image} alt="img"></img>
            ))}
         </div>
         <div className="flex flex-row justify-center space-x-8 mt-10">
            <ButtonValidation identifiant={id} />
            <ButtonRejection identifiant={id}/>
         </div>
      </div>
   );
}
