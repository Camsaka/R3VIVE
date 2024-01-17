// Fetch all posts (in /pages/api/posts.ts)
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const address = searchParams.get("address") as string;
   try {
      const requests = await prisma.certifRequest.findMany({
         where: {
            address: String(address),
         },
      });
      return NextResponse.json(requests);
   } catch (err) {
      return NextResponse.json(
         { err: "Error occured." + err },
         { status: 500 }
      );
   }
}
