/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/flowbite-react/**/*.js",
   ],
   theme: {
      extend: {},
   },
   plugins: [require("flowbite/plugin")],
};
