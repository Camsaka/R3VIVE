export async function uploadPictureToIPFS(id: string | undefined) {
   const url = `/api/uploadtoipfs/picture?id=${id}`;
   const pictureURL = await fetch(url, {
      method: "POST",
   });
   return await pictureURL.json();
}

export async function uploadMetadata(
   id : string,
   urlPicture: FormData,
) {
   const url = `/api/uploadtoipfs/metadata?id=${id}`;
   await fetch(url, {
      method: "POST",
      body : urlPicture
   });
}

const requestIPFSMethods = {
   uploadPictureToIPFS,
   uploadMetadata
};