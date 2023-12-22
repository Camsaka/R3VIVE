"use client";
import React from "react";
import WagmiProvider from "./WagmiProvider";
import AccountProvider from "./AccountProvider";
/* 
Export all providers to injected them in then layout
*/

type ProviderType = {
   children: React.ReactNode;
};

function Providers({ children }: ProviderType) {
   return (
      <WagmiProvider>
         <AccountProvider>{children}</AccountProvider>
      </WagmiProvider>
   );
}

export default Providers;
