import { NextResponse } from "next/server";

import type { NextRequest } from 'next/server'
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'
export const revalidate = true

export async function GET(req: NextRequest) {
   try {
      const requests = await prisma.certifRequest.findMany();
      return NextResponse.json(requests);
   } catch (err) {
      return NextResponse.json(
         { message: "Error occured during get all requests", err },
         { status: 500 }
      );
   }
}
