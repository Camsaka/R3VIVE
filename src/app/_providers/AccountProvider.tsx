import { useEffect, useState } from "react";
import { ProviderProps } from "@/types/types";
import { AccountContext } from "@/app/context/AccountContext";
import { useAccount } from "wagmi";

// Create a provider component with a generic type
function AccountProvider({ children }: ProviderProps) {
   const data = useAccount();
   const [account, setAccount] = useState<ReturnType<typeof useAccount>>(data);
   useEffect(() => {
      setAccount(data);
   }, []);

   useEffect(() => {
      setAccount(data);
   }, [data.address]);

   return (
      <AccountContext.Provider value={account}>
         {children}
      </AccountContext.Provider>
   );
}

export default AccountProvider;
