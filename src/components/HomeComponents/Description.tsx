import labels from "@/data/labels.json";
import Logo from "../Logo";
import bgEngrenages from "../../../public/engrenages-rouages.jpg";

function Description() {
   return (
      <>
         <div
            className="flex flex-col items-center pb-16"
            style={{
               // use the src property of the image object
               backgroundImage: `url(${bgEngrenages.src})`,
               // other styles
               backgroundPosition: "center",
               backgroundSize: "cover",
               backgroundRepeat: "no-repeat",
            }}
         >
            <Logo w={180} h={180} />
         </div>
         <div className="flex flex-col items-center pt-20 text-2xl italic py-36">
            <p className="test-base max-w-prose text-center">
               "{labels.description}"
            </p>
         </div>
      </>
   );
}

export default Description;
