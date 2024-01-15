export async function sendCertifRequest(data: FormData) {
   await fetch("/api/request-certif", {
      method: "POST",
      body: data,
   });
}

export async function getListOfCertif(address: String | any) {
   const url = `/api/get-requests?address=${address}`;
   return await fetch(url, {
      method: "GET",
   });
}

export default { sendCertifRequest, getListOfCertif };
