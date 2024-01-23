import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Providers from "@/app/_providers/Providers";

/* 
These styles apply to every route in the application
*/

import "./globals.css";
import NavBar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
   title: "R3vive",
   description: "R3vive platform",
};

const raleway = Montserrat({
   weight: ["400", "600"],
   subsets: ["latin"],
   display: "swap",
   style: "normal"
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" className={raleway.className}>
         <head></head>
         <body className="dark:text-white">
            <Providers>
               <NavBar></NavBar>
               <div className="pt-20">{children}</div>
            </Providers>
         </body>
      </html>
   );
}
