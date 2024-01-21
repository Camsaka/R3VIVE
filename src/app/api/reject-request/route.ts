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
            rejected: true,
         },
      });
      return NextResponse.json(request);
   } catch (err) {
      return NextResponse.json(
         { message: "Error occured during request rejection.", err },
         { status: 500 }
      );
   }
}
