import Image from "next/image";
import logo from "@/images/logo.jpg";

type LogoProps = {
   w: number,
   h: number
}
function Logo(props: LogoProps){
   return (
         <Image className="rounded-lg" src={logo} alt="logo" width={props.w} height={props.h} />
   );
}
 export default Logo;