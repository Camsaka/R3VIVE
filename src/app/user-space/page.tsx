import AccountInfos from "@/components/Web3/AccountInfos";
import ListOfRequests from "@/components/UserSpace/ListOfRequests";
import ListOfCertificats from "@/components/UserSpace/ListOfCertificats";

/* 
Request certif page.
*/

export default function Certificate() {
   return (
      <div className="flex flex-col">
         <AccountInfos />
         <div className="w-1/2 self-center">
            <ListOfCertificats/>
            <ListOfRequests />
         </div>
      </div>
   );
}
