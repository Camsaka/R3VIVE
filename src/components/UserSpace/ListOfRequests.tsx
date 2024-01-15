/*
List of requests of the user with status and possibility to mint if accepted
*/
"use client";
import { Accordion } from "flowbite-react";
import { useAccountContext } from "@/app/context/AccountContext";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getListOfCertif } from "@/utils/Mailing";
import { Button } from "flowbite-react";

async function getRequests(address: String | undefined) {
   if (address != undefined) {
      const requests = await getListOfCertif(address);
      return requests;
   }
}

function ListOfRequests() {
   const accountContext = useAccountContext();
   const [requests, setRequests] = useState([]);

   const getRequests = () => {
      getListOfCertif(accountContext.address)
         .then((response) => response.json())
         .then((data) => setRequests(data));
   };

   useEffect(() => {
      getRequests();
   }, [accountContext]);

   return (
      <>
         {requests.length == 0 && <h1 className="text-center text-2xl"> Vous n'avez passé aucune requete </h1>}
         {requests.length > 0 && (
            <Accordion>
               {requests.map((value: any, index) => (
                  <Accordion.Panel>
                     <Accordion.Title>
                        {value.name} {value.brand}
                     </Accordion.Title>
                     <Accordion.Content>
                        <h1 className="mb-2 text-gray-500 dark:text-gray-400">
                           {value.brand}
                        </h1>
                        <h2 className="mb-2 text-gray-500 dark:text-gray-400">
                           {value.year}
                        </h2>
                        <p>{value.serialn}</p>
                        <p>{value.description}</p>
                        <p>{value.historic}</p>
                        <p>{value.serialN}</p>
                        <Button
                           className="px-10 flex flex-col mt-5 justify-self-end"
                           gradientMonochrome="cyan"
                           onClick={() => {}}
                        >
                           Mint
                        </Button>
                     </Accordion.Content>
                  </Accordion.Panel>
               ))}
            </Accordion>
         )}
      </>
   );
}
export default ListOfRequests;
