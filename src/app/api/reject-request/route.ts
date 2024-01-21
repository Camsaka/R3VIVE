// Fetch all posts (in /pages/api/posts.ts)
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
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
         { err: "Error occured." + err },
         { status: 500 }
      );
   }
}
