/* eslint-disable @next/next/no-img-element */
/*
List of requests of the user with status and possibility to mint if accepted
*/
"use client";
import { useAccountContext } from "@/app/context/AccountContext";
import { useContractRead } from "wagmi";
import abi from "@/data/abiCertif.json";
import { useEffect, useState } from "react";
import { getNFTMetadata } from "@/utils/SmartContract";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

function ListOfCertificats() {
   const router = useRouter();
   const addressContract =
      process.env.NEXT_PUBLIC_CERTIF_CONTRACT_ADDRESS_SEPOLIA;
   const accountContext = useAccountContext();
   const [certifs, setCertifs] = useState<any[]>([]);

   const result = useContractRead({
      abi,
      address: `0x${addressContract}`,
      functionName: "getCertifFor",
      args: [accountContext.address],
      onSuccess(data: any) {
         data.map(async (value: Number) => {
            const metadata = await getNFTMetadata(value);
            // Extract the CID (Content Identifier) from the IPFS URI
            const cid = metadata.image.split("ipfs://")[1];
            // Use an IPFS gateway to construct the HTTP URL
            const ipfsGateway = "https://ipfs.io/ipfs/";
            const imageUrl = `${ipfsGateway}${cid}`;
            setCertifs((prev) => [
               ...prev,
               { id: value, httpUrl: imageUrl, metadata },
            ]);
         });
      },
   });

   return (
      <div className="grid grid-cols-3 gap-20 self-center w-11/12 border-solid border-2 border-slate-700 py-20 px-10 rounded-lg">
         {certifs.map((value: any, index) => (
            <div
               key={index}
               className="rounded-lg border-solid border border-black dark:border-slate-50 space-y-4 p-4 dark:bg-neutral-950 h-auto"
            >
               <h2 className="text-center text-2xl underline font-bold">
                  {value.metadata.name}
               </h2>
               <p>{value.metadata.description}</p>
               <p>
                  {value.metadata.attributes[0].trait_type} :{" "}
                  {value.metadata.attributes[0].value}{" "}
               </p>
               <p>
                  {value.metadata.attributes[1].trait_type} :{" "}
                  {value.metadata.attributes[1].value}
               </p>
               <p>
                  {value.metadata.attributes[2].trait_type} :{" "}
                  {value.metadata.attributes[2].value}
               </p>
               <p>
                  {value.metadata.attributes[3].trait_type} :{" "}
                  {value.metadata.attributes[3].value}
               </p>
               <p>
                  {value.metadata.attributes[4].trait_type} :{" "}
                  {value.metadata.attributes[4].value}
               </p>
               <img
                  className="flex w-1/2 mx-auto"
                  src={value.httpUrl}
                  alt={value.metadata.image}
               ></img>
               <div className="mt-4 grid grid-cols-2 items-center">
                  <a
                     className="underline hover:no-underline"
                     href={`https://testnets.opensea.io/fr/assets/sepolia/0xb9f61eebd96ddad25bd4529f4ef65ac9f49d69a7/${value.id}`}
                  >
                     Lien vers opensea
                  </a>
                  <Button gradientDuoTone="tealToLime" className="bg-teal-900">
                     Transferer
                  </Button>
               </div>
            </div>
         ))}
      </div>
   );
}
export default ListOfCertificats;

// attributes
// :
// Array(5)
// 0
// :
// {trait_type: 'Marque', value: 'Breitling'}
// 1
// :
// {trait_type: 'Année', value: '2022'}
// 2
// :
// {trait_type: 'Numéro de serie', value: 'zegzegze'}
// 3
// :
// {trait_type: 'Description', value: 'zeggzegze'}
// 4
// :
// {trait_type: 'Historic', value: 'dfafaf'}
// length
// :
// 5
// [[Prototype]]
// :
// Array(0)
// description
// :
// "Certificat d'authenticité délivré par R3VIVE"
// external_url
// :
// "https://r3vive.vercel.app/"
// image
// :
// "ipfs://bafybeihojaueubcxxr5ja5rgtiac5lspc3u36jn2dv4pm4763cxjrpwkdi/0"
// name
// :
// "ezgazegze"
