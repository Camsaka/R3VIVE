/* 
Export types for all my application
*/

export type FormDataR3Validation = {
   name: string;
   brand: string;
   serialN: string;
   year: string;
   description: string;
   historic: string;
   address: string;
   tokenid: string;
};

export interface ProviderProps {
   children: React.ReactNode;
}
