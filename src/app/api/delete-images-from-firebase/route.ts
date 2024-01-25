import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ref, deleteObject, StorageReference } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function DELETE(req: NextRequest) {
   try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id") as string;
      const request = await prisma.certifRequest.findUnique({
         where: {
            id: String(id),
         },
      });
      const images = request?.images;

      if (images && images.length > 0) {
         // Use Promise.all to wait for all deleteObject promises to settle
         await Promise.all(
            images.map(async (url: string) => {
               const idImage = url.split("%2F")[1].toString().split("?")[0];
               const refImage = ref(storage, `imagesR3vive/${idImage}`);

               try {
                  // Delete the file
                  await deleteObject(refImage);
                  // You can log success messages here if needed
                  console.log(`Image ${idImage} deleted successfully`);
               } catch (error) {
                  // Log the error, but don't throw it, so that other images can be processed
                  console.error(`Error deleting image ${idImage}: ${error}`);
               }
            })
         );

         return NextResponse.json({ message: "Images deleted successfully" });
      } else {
         return NextResponse.json({
            message: "Pas d'images à supprimer",
            status: 404,
         });
      }
   } catch (err) {
      return NextResponse.json({
         message: "Error occurred during deleting images from firebase",
         err,
         status: 500,
      });
   }
}
