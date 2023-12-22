import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

/* 
Admin button appear on the navbar when owner of the contract is connected.
See .env file for contract address.
*/
function AdminSpaceButton() {
   const router = useRouter();
   return (
      <Button
         className="px-10 flex flex-col mr-5"
         gradientDuoTone="pinkToOrange"
         onClick={() => {
            router.push("/admin");
         }}
      >
         Admin
      </Button>
   );
}

export default AdminSpaceButton;
