// Fetch all posts (in /pages/api/posts.ts)
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id") as string;
   try {
      const request = await prisma.certifRequest.update({
         where: {
            id: id,
         },
         data: {
            mintable: true,
         },
      });
      return NextResponse.json(request);
   } catch (err) {
      return NextResponse.json(
         { err: "Error occured during request validation" + err },
         { status: 500 }
      );
   }
}
