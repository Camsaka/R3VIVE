import AccountInfos from "@/components/Web3/AccountInfos";
import ListOfRequests from "@/components/UserSpace/ListOfRequests";

/* 
Request certif page.
*/

export default function Certificate() {
   return (
      <div className="flex flex-col text-white">
         <AccountInfos />
         <div className="w-1/2 self-center">
            <ListOfRequests />
         </div>
      </div>
   );
}
