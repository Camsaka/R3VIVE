import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

function AdminSpaceButton() {
   const router = useRouter();
   return (
      <Button
         className="px-10 flex flex-col mr-5"
         gradientDuoTone="pinkToOrange"
         onClick={() => {
            console.log("redirect");
            router.push("/admin");
         }}
      >
         Admin
      </Button>
   );
}

export default AdminSpaceButton;
