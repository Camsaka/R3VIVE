"use client";
import React, { useEffect, useState } from "react";
import WagmiProvider from "./WagmiProvider";
import AccountProvider from "./AccountProvider";
import { ThemeProvider } from "next-themes";

/* 
Export all providers to injected them in then layout
*/

type ProviderType = {
   children: React.ReactNode;
};

function Providers({ children }: ProviderType) {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return (
         <WagmiProvider>
            <AccountProvider>{children}</AccountProvider>
         </WagmiProvider>
      );
   }

   return (
      <ThemeProvider>
         <WagmiProvider>
            <AccountProvider>{children}</AccountProvider>
         </WagmiProvider>
      </ThemeProvider>
   );
}

export default Providers;
