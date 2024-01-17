import { FormDataR3Validation } from "@/types/types";
import { NextApiRequest, NextApiResponse } from 'next';


export async function uploadPicture(pictureToUpload : File | null){
   if(pictureToUpload != null){
      
   }
   //upload picture and get his hash
}

export async function uploadMetadata(dataToUpload: FormDataR3Validation){

   //set image url(ipfs), upload metadata and get his hash
}

const uploadIPFSMethod = {
   uploadPicture, uploadMetadata
}

export default uploadIPFSMethod;