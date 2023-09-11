import labels from "@/data/labels.json"
import Logo from "../Logo";

function Description() {
   return (
      <div className="flex flex-col items-center mt-20 space-y-10">
         <Logo w={180} h={180} />
         <h1 className="text-4xl italic">R3VIVE</h1>
         <p className="test-base max-w-prose text-center">{labels.description}</p>
      </div>
   );
}

export default Description;
