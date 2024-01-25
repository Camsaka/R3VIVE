import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id") as string;
   try {
      const deleteRequest = await prisma.certifRequest.delete({
         where: {
            id: id,
         },
      });
      return NextResponse.json(deleteRequest);
   } catch (err) {
      return NextResponse.json(
         { message: "Error occured during get deleting request", err },
         { status: 500 }
      );
   }
}
