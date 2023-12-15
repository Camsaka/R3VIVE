import AdminSideBar from "@/components/Administration/AdminSidebar";
import AdminValidationToken from "@/components/Web3/AdminValidationToken";

export default function adminPage() {
   return (
      <>
         <AdminValidationToken></AdminValidationToken>
         <AdminSideBar></AdminSideBar>
      </>
   )
}