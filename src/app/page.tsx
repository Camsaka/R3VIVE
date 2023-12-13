"use client"
import Carousel from "@/components/HomeComponents/Carousel";
import Description from "@/components/HomeComponents/Description";
import HeadBar from "@/components/HeadBar/HeadBar";

export default function Home() {
   return (
      <div>
         <HeadBar></HeadBar>
         <Description></Description>
         <Carousel></Carousel>
      </div>
   );
}
