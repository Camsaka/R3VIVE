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
      <div className="flex flex-col mr-10 justify-center h-7">
         <Button
            color="dark"
            pill
            className="border border-gray-300"
            onClick={() => {
               if (theme === "light") {
                  setTheme("dark");
               } else setTheme("light");
            }}
         >
            {theme}
         </Button>
      </div>
   );
};

export default ThemeSwitcher;
