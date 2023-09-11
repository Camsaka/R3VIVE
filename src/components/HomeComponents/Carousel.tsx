"use client";
import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import news from "@/data/news.json";

function Carousel() {
   const [activeSlideIndex, setActiveSlideIndex] = useState(0);

   return (
      <div className="mt-20">
         <ReactSimplyCarousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={1}
            itemsToScroll={1}
            containerProps={{
               style: {
                 width: "100%",
                 marginBottom:"2%"
               }
             }}
            forwardBtnProps={{
               //here you can also pass className, or any other button element attributes
               style: {
                  alignSelf: "center",
                  background: "black",
                  border: "none",
                  borderRadius: "50%",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  height: 30,
                  lineHeight: 1,
                  textAlign: "center",
                  width: 30,
                  marginLeft: "1%",
               },
               children: <span>{`>`}</span>,
            }}
            backwardBtnProps={{
               //here you can also pass className, or any other button element attributes
               style: {
                  alignSelf: "center",
                  background: "black",
                  border: "none",
                  borderRadius: "50%",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  height: 30,
                  lineHeight: 1,
                  textAlign: "center",
                  width: 30,
                  marginRight: "1%",
                  alignItems: "center",
                  alignContent:"center"
               },
               children: <span>{`<`}</span>,
            }}
            responsiveProps={[
               {
                  itemsToShow: 1,
                  itemsToScroll: 1,
                  minWidth: 768,
               },
            ]}
            speed={400}
            easing="linear"
         >
            {news.events.map((event) => (
               <div
                  key={event.id}
                  style={{
                     width: "90vw",
                     height: "20vw",
                     backgroundImage: `url(${event.background})`,
                  }}
                  className="place-items-center text-center rounded-lg bg-no-repeat bg-center bg-cover text-slate-300"
               >
                  <h1 className="text-3xl font-bold m-2">{event.name}</h1>
                  <p className="m-2">{event.description}</p>
               </div>
            ))}
         </ReactSimplyCarousel>
      </div>
   );
}

export default Carousel;
