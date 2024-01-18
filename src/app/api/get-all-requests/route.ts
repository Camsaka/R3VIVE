// Fetch all posts (in /pages/api/posts.ts)
import { NextResponse } from "next/server";

import type { NextRequest } from 'next/server'
import prisma from "../../../lib/prisma";

export const dynamic = 'force-dynamic'
export const revalidate = true

export async function GET(req: NextRequest) {
   try {
      const requests = await prisma.certifRequest.findMany();
      return NextResponse.json(requests);
   } catch (err) {
      return NextResponse.json(
         { err: "Error occured." + err },
         { status: 500 }
      );
   }
}
