import labels from "@/data/labels.json"
import Logo from "../Logo";

function Description() {
   return (
      <div className="flex flex-col items-center my-20">
         <Logo w={180} h={180} />
         <p className="test-base max-w-prose text-center">{labels.description}</p>
      </div>
   );
}

export default Description;
