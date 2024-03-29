import { log } from "console";
import Link from "next/link";
import DropDown from "./DropDown";

/* 
Link list for navbar depends on connection context (connected ?)
*/

// Example LinkList component
interface LinkListProps {
   isConnected: boolean;
 }
 
 const LinkList: React.FC<LinkListProps> = ({ isConnected }) => {
   return (
      <div className="flex self-center justify-between">
         <ul className="space-x-28 flex">
            <li>
               <Link href="/" className="hover:text-gray-500">
                  Accueil
               </Link>
            </li>
            <li>
               <Link href="/aboutus" className="hover:text-gray-500">
                  A propos de nous
               </Link>
            </li>
            {isConnected && (
               <li>
                  <Link href="/certificat" className="hover:text-gray-500">
                     Demander mon certificat
                  </Link>
               </li>
            )}
                        {isConnected && (
               <li>
                  <DropDown></DropDown>
               </li>
            )}
         </ul>
      </div>
   );
}

export default LinkList;
