export async function sendConfirmationMail(data: FormData) {
   await fetch("/api/send-mail", {
      method: "POST",
      body: data,
   });
}

export default { sendConfirmationMail };
