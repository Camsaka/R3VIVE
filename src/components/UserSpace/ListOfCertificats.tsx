/*
List of requests of the user with status and possibility to mint if accepted
*/
"use client";
import { Accordion } from "flowbite-react";
import { useAccountContext } from "@/app/context/AccountContext";
import { useEffect, useState } from "react";
import { getListOfCertif } from "@/utils/requestsCertif";
import { Button } from "flowbite-react";

function ListOfCertificats() {
   const accountContext = useAccountContext();
   const [requests, setRequests] = useState([]);

   const getRequests = () => {
      getListOfCertif(accountContext.address)
         .then((response) => response.json())
         .then((data) => setRequests(data));
   };

   useEffect(() => {
      getRequests();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [accountContext]);

   return (
      <>
         {requests.length == 0 && (
            <h1 className="text-center text-2xl">
               {" "}
               Vous n&apos;avez passé aucune requete{" "}
            </h1>
         )}
         {requests.length > 0 && (
            <>
               <a className="underline decoration-sky-500 mb-14 text-xl">Mes requetes : </a>
               <Accordion className="my-5" collapseAll>
                  {requests.map((value: any, index) => (
                     <Accordion.Panel key={index}>
                        <Accordion.Title className="">
                           {value.name}
                           {value.brand}
                        </Accordion.Title>
                        <Accordion.Content>
                           <h1 className="mb-2">{value.brand}</h1>
                           <h2 className="mb-2">{value.year}</h2>
                           <p>{value.serialn}</p>
                           <p>{value.description}</p>
                           <p>{value.historic}</p>
                           <p>{value.serialN}</p>
                           <Button
                              className="px-10 flex flex-col mt-5 justify-self-end"
                              gradientMonochrome="cyan"
                              onClick={() => {}}
                              disabled={!value.mintable}
                           >
                              Mint
                           </Button>
                        </Accordion.Content>
                     </Accordion.Panel>
                  ))}
               </Accordion>
            </>
         )}
      </>
   );
}
export default ListOfCertificats;
