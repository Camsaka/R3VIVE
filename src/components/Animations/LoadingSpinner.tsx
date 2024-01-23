export default function LoadingSpinner() {
   return (
      <div className="spinner">
         {/* Replace the following with your preferred spinner SVG or use a library */}
         <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
         >
            <circle
               className="opacity-25"
               cx="12"
               cy="12"
               r="10"
               stroke="currentColor"
               strokeWidth="4"
            ></circle>
            <path
               className="opacity-75"
               fill="currentColor"
               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.416A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4.584zM10 20h4a7.963 7.963 0 01-4-1.098V20zm4-16h-4a7.963 7.963 0 014 1.098V4z"
            ></path>
         </svg>
      </div>
   );
}
