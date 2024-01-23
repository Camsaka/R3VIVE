/* eslint-disable @next/next/no-img-element */
/*
List of requests of the user with status and possibility to mint if accepted
*/
"use client";
import { Accordion } from "flowbite-react";
import { useAccountContext } from "@/app/context/AccountContext";
import { useEffect, useState } from "react";
import { getListOfRequests } from "@/utils/requestsCertif";
import { Button } from "flowbite-react";
import StatusOfRequest from "./StatusOfRequest";
import { uploadMetadata, uploadPictureToIPFS } from "@/utils/IPFS";
import { mintNFT } from "@/utils/SmartContract";

async function mintNft(request: any, address: `0x${string}`) {

   //upload picture on IPFS
   const pictureURL = await uploadPictureToIPFS(request.id);

   //create body with picture url
   const pictureFormatUrl: FormData = new FormData();
   pictureFormatUrl.append("pictureURL", pictureURL.IPFSUrl);

   //upload metadata on IPFS
   const nftURI = await uploadMetadata(request.id, pictureFormatUrl);
   //Mint NFT with right metadata
   const mintedData = await mintNFT(nftURI.IPFSUrl, address);

   //delete the request from the psql db
   const url = `/api/delete-request?id=${request.id}`;
   const deletedRequest = await fetch(url, {
      method: "DELETE",
   });
   console.log(deletedRequest);
}

function ListOfRequests() {
   const accountContext = useAccountContext();
   const [requests, setRequests] = useState([]);

   const getRequests = () => {
      getListOfRequests(accountContext.address)
         .then((response) => response.json())
         .then((data) => {
            setRequests(data);
         });
   };

   useEffect(() => {
      getRequests();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [accountContext]);

   return (
      <div className="self-center w-11/12 border-solid border-2 border-slate-700 py-20 px-24 rounded-lg mb-10">
         {requests.length > 0 ? (
            <>
               <Accordion collapseAll className="my-5">
                  {requests.map((value: any, index) => (
                     <Accordion.Panel key={index}>
                        <Accordion.Title className="">
                           {value.name}
                           <StatusOfRequest
                              mintable={value.mintable}
                              rejected={value.rejected}
                           />
                        </Accordion.Title>
                        <Accordion.Content>
                           <h1 className="mb-2">{value.brand}</h1>
                           <h2 className="mb-2">{value.year}</h2>
                           <p>{value.serialn}</p>
                           <p>{value.description}</p>
                           <p>{value.historic}</p>
                           <p>{value.serialN}</p>
                           <div className="flex justify-stretch">
                              {value.images.map((image: any, index: any) => (
                                 <img
                                    key={index}
                                    className="mt-5 h-28"
                                    src={image}
                                    alt="img"
                                 ></img>
                              ))}
                           </div>
                           <Button
                              className="px-10 flex flex-col mt-5 justify-self-end"
                              gradientMonochrome="cyan"
                              onClick={() => {
                                 if (accountContext.address) {
                                    mintNft(value, accountContext.address);
                                 }
                              }}
                              disabled={!value.mintable}
                           >
                              Mint
                           </Button>
                        </Accordion.Content>
                     </Accordion.Panel>
                  ))}
               </Accordion>
            </>
         ) : (<p>Vous n'avez pas de requêtes en cours.</p>)}
      </div>
   );
}
export default ListOfRequests;
