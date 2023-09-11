import Carousel from "@/components/HomeComponents/Carousel";
import Description from "@/components/HomeComponents/Description";
import HeadBarDisconnected from "@/components/HeadBar/HeadBarDisconnected";
import AccountInfos from "@/components/Web3/AccountInfos";
import { useEffect, useState } from "react";

export default function Home() {
   return (
      <div>
         <HeadBarDisconnected></HeadBarDisconnected>
         <Description></Description>
         <Carousel></Carousel>
         <AccountInfos></AccountInfos>
      </div>
   );
}
