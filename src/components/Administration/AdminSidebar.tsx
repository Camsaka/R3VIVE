"use client";

import { Sidebar } from "flowbite-react";
import {
   HiArrowSmRight,
   HiChartPie,
   HiInbox,
   HiShoppingBag,
   HiTable,
   HiUser,
   HiViewBoards,
} from "react-icons/hi";

function AdminSideBar() {
   return (
         <Sidebar className="h-screen">
            <Sidebar.Items>
               <Sidebar.ItemGroup>
                  <Sidebar.Item href="/admin" icon={HiTable}>
                     Confirmation certificat
                  </Sidebar.Item>
                  <Sidebar.Item
                     href="/admin/stats"
                     icon={HiChartPie}
                  >
                     Stats
                  </Sidebar.Item>
                  <Sidebar.Item href="/admin/users" icon={HiUser}>
                     Utilisateurs
                  </Sidebar.Item>
               </Sidebar.ItemGroup>
            </Sidebar.Items>
         </Sidebar>

   );
}

export default AdminSideBar;
