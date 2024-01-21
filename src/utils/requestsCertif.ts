export async function sendCertifRequest(data: FormData) {
   await fetch("/api/request-certif", {
      method: "POST",
      body: data,
   });
}

export async function getListOfRequests(address: string | undefined) {
   const url = `/api/get-requests?address=${address}`;
   return await fetch(url, { next: { revalidate: 3 }, method: "GET" });
}

export async function getAllRequestsActive() {
   const url = "/api/get-all-requests";
   return await fetch(url, {
      method: "GET",
   });
}

export async function getRequestById(id: string) {
   const url =
      process.env.STATIC_URL_REQUESTS + `/api/get-requestbyid?id=${id}`;
   return await fetch(url, {
      method: "GET",
   });
}

export async function validateRequest(id: string | undefined) {
   const url = `/api/validate-request?id=${id}`;
   return await fetch(url, {
      method: "PUT",
   });
}

export async function rejectRequest(id: string | undefined) {
   const url = `/api/reject-request?id=${id}`;
   return await fetch(url, {
      method: "PUT",
   });
}

export async function getAllRequestsActiveServerSide() {
   const url = process.env.STATIC_URL_REQUESTS + "/api/get-all-requests";
   return await fetch(url, {
      method: "GET",
   });
}



const requestCertifMethods = {
   sendCertifRequest,
   getListOfRequests,
   getAllRequestsActive,
   getRequestById,
   validateRequest,
   getAllRequestsActiveServerSide
};

export default requestCertifMethods;
