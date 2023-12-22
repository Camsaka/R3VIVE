import Image from "next/image";
import logo from "@/images/logo.jpg";

/*
Logo component wich can be import and sized with w(weight) and h(height) props
*/

type LogoProps = {
   w: number;
   h: number;
};

function Logo(props: LogoProps) {
   return (
      <>
         <Image
            className="rounded-lg"
            src={logo}
            alt="logo"
            width={props.w}
            height={props.h}
         />
      </>
   );
}
export default Logo;
