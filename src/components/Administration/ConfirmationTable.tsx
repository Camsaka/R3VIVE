"use client";
import { getAllRequestsActive } from "@/utils/requestsCertif";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ConfirmationTable() {
   const [requests, setRequests] = useState([]);

   useEffect(() => {
      getAllRequestsActive()
         .then((response) => response.json())
         .then((data) => {
            setRequests(data);
         });
   }, []);

   return (
      <>
         {requests.length == 0 && (
            <h1 className="text-center text-2xl">
               {" "}
               Vous n&apos;avez passé aucune requete{" "}
            </h1>
         )}
         {requests.length > 0 && (
            <div className="overflow-x-auto space-y-4">
               <a className="underline decoration-sky-500 mb-14 text-xl ">
                  Requetes :{" "}
               </a>
               <Table striped hoverable>
                  <Table.Head>
                     <Table.HeadCell className="dark:bg-gray-900">
                        Address
                     </Table.HeadCell>
                     <Table.HeadCell>Name</Table.HeadCell>
                     <Table.HeadCell>Marque</Table.HeadCell>
                     <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                     </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                     {requests.map((value: any, index) => (
                        <Table.Row
                           key={index}
                           className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              {value.address}
                           </Table.Cell>
                           <Table.Cell>{value.name}</Table.Cell>
                           <Table.Cell>{value.brand}</Table.Cell>
                           {!value.mintable && (
                              <Table.Cell>
                                 <a
                                    href={`admin/request/${value.id}`}
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                 >
                                    Edit
                                 </a>
                              </Table.Cell>
                           )}
                           {value.mintable && (
                              <Table.Cell>
                                 <p className="text-green-600">VALIDATED</p>
                              </Table.Cell>
                           )}
                        </Table.Row>
                     ))}
                  </Table.Body>
               </Table>
            </div>
         )}
      </>
   );
}
