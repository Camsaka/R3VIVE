import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
      //recupérer l'url
      const { searchParams } = new URL(req.url);
      //extraire l'id de la request
      const id = searchParams.get("id") as string;
      //fetch l'api pour obtenir les données de la requete et les mettre au format json
      const request = await (
         await fetch(
            process.env.STATIC_URL_REQUESTS + `/api/get-requestbyid?id=${id}`
         )
      ).json();
      //recupérer la première url d'image
      const urlPicture = request.images[0];

      // First, instantiate the thirdweb IPFS storage
      const storageThirdWeb = new ThirdwebStorage({
         secretKey: process.env.THIRDWEB_API_KEY, // You can get one from dashboard settings
      });
      const response = await fetch(urlPicture);
      const imageBuffer = await response.arrayBuffer();

      // // Upload the blob to IPFS
      const uri = await storageThirdWeb.upload(Buffer.from(imageBuffer));

      // // // Resolve the IPFS URI with a gateway
      const IPFSUrl = await storageThirdWeb.resolveScheme(uri);

      // // Download data from the IPFS URI
      // const dataIPFS = await storageThirdWeb.downloadJSON(uri);

      return NextResponse.json({
         message: "Upload the picture done on ipfs",
         IPFSUrl,
      });
      
   } catch (err) {
      // Handle errors, e.g., log them or throw a more specific error
      console.error("Error during upload picture on ipfs :", err);
      throw err;
   }
}
