// Fetch all posts (in /pages/api/posts.ts)
import { NextResponse } from "next/server";

import type { NextRequest } from 'next/server'
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
   try {
      const requests = await prisma.certifRequest.findMany();
      console.log(requests)
      return NextResponse.json(requests);
   } catch (err) {
      return NextResponse.json(
         { err: "Error occured." + err },
         { status: 500 }
      );
   }
}
