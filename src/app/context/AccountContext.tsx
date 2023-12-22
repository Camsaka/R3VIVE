// import { AccountContextType } from "@/types/types";
import { createContext, useContext } from "react";
import { useAccount } from "wagmi";


// Create a context with an initial value
export const AccountContext = createContext<ReturnType<typeof useAccount> | undefined>(undefined);

export function useAccountContext() {
   const context = useContext(AccountContext);
   if (!context) {
     throw new Error('useAccountContext must be used within a AccountProvider');
   }
   return context;
  }
