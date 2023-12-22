import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

/* 
Should move on a backend project
Describe post methode to send a mail.
Accessible from : /api/send-mail 
TODO Api documentation + status return and errors handling
*/

export async function POST(request: NextRequest) {
   const formData = await request.formData();

   const files = formData.getAll("files") as File[];
   const email = formData.get("email");
   const name = formData.get("name");
   const brand = formData.get("brand");
   const year = formData.get("year");
   const serialN = formData.get("serialN");
   const description = formData.get("description");
   const historic = formData.get("historic");
   const address = formData.get("address");
   const tokenid = formData.get("tokenid");

   if (!files || files.length === 0) {
      const message = "No pictures linked"
      return NextResponse.json({message : message}, { status: 400 });
   }

   const attachmentsPromises = files.map(async (file: File) => {
      const buffer = await file.arrayBuffer();
      return {
         filename: file.name,
         content: Buffer.from(buffer),
      };
   });

   const attachments = await Promise.all(attachmentsPromises);

   const transport = nodemailer.createTransport({
      service: "gmail",
      /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
      auth: {
         user: process.env.NODEMAILER_EMAIL,
         pass: process.env.NODEMAILER_PW,
      },
   });
   const htmlContent = `
   <h1>Requete de certificat de ${address}</h1>
   <h2>Données de la requete : </h2>
   <p>Email : ${email}</p>
   <p>Nom : ${name}</p>
   <p>Marque : ${brand}</p>
   <p>Numero de série : ${serialN}</p>
   <p>Année de fabrication : ${year}</p>
   <p>Description : ${description}</p>
   <p>Historique : ${historic}</p>
   <p>Address du demandeur : ${address}</p>
   </br>
   <p>Images pour authenticité en PJ</p>
   `;

   const mailOptions : Mail.Options = {
      from: `${name} <${email}>`,
      to: process.env.NODEMAILER_EMAIL,
      // cc: email, (uncomment this line if you want to send a copy to the sender)
      subject: `Requete de certificat de ${address} `,
      html: htmlContent,
      attachments: attachments,
   };

   try {
      await transport.sendMail(mailOptions);
      return NextResponse.json({
         files: files.map((file: File) => ({
            name: file.name,
            size: file.size,
            lastModified: new Date(file.lastModified),
         })),
      });
   } catch (err : any) {
      const message = "Erreur lors de l'envoi du mail de requete certif."
      return NextResponse.json({message, error: err.message }, { status: 500 });
   }
}
