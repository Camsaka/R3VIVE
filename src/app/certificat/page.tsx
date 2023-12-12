import HeaderBar from "@/components/HeadBar/HeadBar";
import AccountInfos from "@/components/Web3/AccountInfos";
import ContractInteractionBox from "@/components/Web3/ContractInteractionBox";

export default function Certificate() {
   return (
      <div>
         <HeaderBar />
         <AccountInfos/>
         <ContractInteractionBox />   
      </div>
   );
}


