import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
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

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <head>
         </head>
         <body className="dark:text-white">
               <Providers>
                  <NavBar />
                  {children}
               </Providers>
         </body>
      </html>
   );
}
