/* eslint-disable @next/next/no-img-element */
import { Carousel } from "flowbite-react";

function CarouselComp() {
   return (
      <div className="mx-auto my-20 text-center h-96 w-3/4 border-solid border-white border-y items-center flex">
         <Carousel className="h-80">
            <div>
               <img
                  src="https://www.agencecaza.ca/assets/Uploads/Pages/nouveautes/evenement-trucs.jpg"
                  alt="event"
               />
            </div>
            <img
               src="https://magazineluxe.com/wp-content/uploads/2012/05/PAR_195web.jpg"
               alt="event"
            />
            <img
               src="https://media.sudouest.fr/8854797/1200x-1/so-57ebcb3466a4bd6726a9153a-ph0.jpg"
               alt="event"
            />
            <img
               src="https://static1.purepeople.com/articles/5/25/91/65/@/3653077-exclusif-soiree-pour-la-presentation-1200x0-2.jpg"
               alt="event"
            />
         </Carousel>
      </div>
   );
}

export default CarouselComp;
