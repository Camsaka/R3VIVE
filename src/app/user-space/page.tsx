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
         <p className=" mb-12 text-2xl text-center">Mes certificats</p>
         <ListOfCertificats />
         <p className=" my-12 text-2xl text-center">Mes requetes</p>
         <ListOfRequests />
      </div>
   );
}
