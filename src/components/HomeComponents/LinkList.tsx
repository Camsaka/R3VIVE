import Link from "next/link";
import { useRouter } from "next/navigation";

function LinkList() {
   return (
      <nav className="space-x-10">
         <ul className="space-x-28 flex">
            <li>
               <Link href="/" className="hover:text-gray-500 underline">
                  Accueil
               </Link>
            </li>
            <li>
               <Link href="/marketplace" className="hover:text-gray-500 underline">
                  Acheter une montre
               </Link>
            </li>
            <li>
               <Link href="/vendre" className="hover:text-gray-500 underline">
                  Vendre une montre
               </Link>
            </li>
            <li>
               <Link href="/aboutus" className="hover:text-gray-500 underline">
                  A propos de nous
               </Link>
            </li>
         </ul>
      </nav>
   );
}

export default LinkList;