import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function GET(
   req: Request,
) {
   const {searchParams} = new URL(req.url);
   const id = searchParams.get('id') as string;
   try {
      const request = await prisma.certifRequest.findUnique(
         {
         where: {
            id: String(id),
         },
      }
      );
      return NextResponse.json(request);
   } catch (err) {
      return NextResponse.json({ err: "Error occured." + err }, {status : 500});
   }
}
