"use client"
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiTable, HiUser } from "react-icons/hi";

/* Lateral menu for admin interface */
function AdminSideBar() {
   return (
      <div className="full-height rounded-r-lg">
         <Sidebar className="h-auto">
            <Sidebar.Items>
               <Sidebar.ItemGroup>
                  <Sidebar.Item href="/admin" icon={HiTable}>
                     Confirmation certificat
                  </Sidebar.Item>
                  <Sidebar.Item href="/admin/stats" icon={HiChartPie}>
                     Stats
                  </Sidebar.Item>
                  <Sidebar.Item href="/admin/users" icon={HiUser}>
                     Utilisateurs
                  </Sidebar.Item>
               </Sidebar.ItemGroup>
            </Sidebar.Items>
         </Sidebar>
      </div>
   );
}

export default AdminSideBar;
