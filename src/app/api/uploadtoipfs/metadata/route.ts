import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { NextRequest, NextResponse } from "next/server";

function createMetadataFile(requestData: any, pictureURL: string) {
   const metadata = {
      description: "Certificat d'authenticité délivré par R3VIVE",
      external_url: "https://r3vive.vercel.app/",
      image: pictureURL,
      name: requestData.name,
      attributes: [
         {
            trait_type: "Marque",
            value: requestData.brand,
         },
         {
            trait_type: "Année",
            value: requestData.year,
         },
         {
            trait_type: "Numéro de serie",
            value: requestData.serialn,
         },
         {
            trait_type: "Description",
            value: requestData.description,
         },
         {
            trait_type: "Historic",
            value: requestData.historic,
         },
      ],
   };
   return metadata;
}

export async function POST(req: NextRequest) {
   try {
      //recupérer l'url et le body
      const { searchParams } = new URL(req.url);
      const formData = await req.formData();
      //extraire l'id de la request
      const id = searchParams.get("id") as string;
      //fetch l'api pour obtenir les données de la requete et les mettre au format json
      const request = await (
         await fetch(
            process.env.STATIC_URL_REQUESTS + `/api/get-requestbyid?id=${id}`
         )
      ).json();

      const pictureURL = formData.get("pictureURL");

      if (pictureURL) {
         const metadata = createMetadataFile(request, pictureURL.toString());

         //TODO : build metadata file, fill the image field with pictureURL, upload on IPFS and return URL or URI
         // First, instantiate the thirdweb IPFS storage
         const storageThirdWeb = new ThirdwebStorage({
            secretKey: process.env.THIRDWEB_API_KEY, // You can get one from dashboard settings
         });

         // Upload the blob to IPFS
         const uri = await storageThirdWeb.upload(metadata);

         // Resolve the IPFS URI with a gateway
         const IPFSUrl = await storageThirdWeb.resolveScheme(uri);

         // Download data from the IPFS URI
         // const dataIPFS = await storageThirdWeb.downloadJSON(uri);
         return NextResponse.json({
            message: "Upload metadata done on ipfs",
            metadata,
            uri, 
            IPFSUrl
         });
      } else {
         return NextResponse.json(
            {
               message:
                  "Failed to create metadata (maybe the image is missing)",
            },
            { status: 500 }
         );
      }
   } catch (err) {
      // Handle errors, e.g., log them or throw a more specific error
      console.error("Error upload metadata on ipfs :", err);
      throw err;
   }
}
