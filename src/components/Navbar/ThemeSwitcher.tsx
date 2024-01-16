"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "flowbite-react";

const ThemeSwitcher = () => {
   const [mounted, setMounted] = useState(false);
   const { theme, setTheme } = useTheme();

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return null;
   }

   return (
      <div className="flex flex-col mr-10 justify-center">
         <Button color="dark" pill onClick={() => setTheme("dark")}>
            Dark
         </Button>
         <Button
            color="light"
            pill
            onClick={() => setTheme("light")}
            className="mt-1"
         >
            Light
         </Button>
      </div>
   );
};

export default ThemeSwitcher;
