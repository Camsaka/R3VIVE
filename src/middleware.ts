import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   // Clone the request headers and set a new header `x-hello-from-middleware1`
   const requestHeaders = new Headers(request.headers);
   requestHeaders.set(
      "Cache-Control",
      "no-cache, no-store, max-age=0, must-revalidate"
   );

   // You can also set request headers in NextResponse.rewrite
   const response = NextResponse.next({
      request: {
         // New request headers
         headers: requestHeaders,
      },
   });

   // Set a new response header `x-hello-from-middleware2`
   response.headers.set(
      "Cache-Control",
      "no-cache, no-store, max-age=0, must-revalidate"
   );
   return response;
}
