import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { NextRequest, NextResponse } from "next/server";

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


      //TODO : build metadata file, fill the image field with pictureURL, upload on IPFS and return URL or URI 
      // First, instantiate the thirdweb IPFS storage
      const storageThirdWeb = new ThirdwebStorage({
         secretKey: process.env.THIRDWEB_API_KEY, // You can get one from dashboard settings
      });

      // // // Upload the blob to IPFS
      // const uri = await storageThirdWeb.upload();

      // // // // Resolve the IPFS URI with a gateway
      // const IPFSUrl = await storageThirdWeb.resolveScheme(uri);

      // // Download data from the IPFS URI
      // const dataIPFS = await storageThirdWeb.downloadJSON(uri);

      return NextResponse.json({
         message: "Upload the metadata done on ipfs",
      });
      
   } catch (err) {
      // Handle errors, e.g., log them or throw a more specific error
      console.error("Error upload picture on ipfs |error| :", err);
      throw err;
   }
}
