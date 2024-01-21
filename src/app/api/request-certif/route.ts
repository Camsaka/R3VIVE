import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import prisma from "@/lib/prisma";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { randomUUID } from "crypto";

/* 
Should move on a backend project
Describe post methode to send a mail and upload data on vercel postgres storage db.
Accessible from : /api/request-certif.
*/

export async function POST(request: NextRequest) {
   var images: string[] = [];
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

   if (!files || files.length === 0) {
      const message = "No pictures linked";
      return NextResponse.json({ message: message }, { status: 400 });
   }

   files.map(async (file: File) => {
      const imageRef = ref(storage, `imagesR3vive/${randomUUID()}${file.name}`);
      uploadBytes(imageRef, file).then((snapshot) => {
         getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            images.push(url);
         });
      });
   });

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

   const mailOptions: Mail.Options = {
      from: `${name} <${email}>`,
      to: process.env.NODEMAILER_EMAIL,
      // cc: email, (uncomment this line if you want to send a copy to the sender)
      subject: `Requete de certificat de ${address} `,
      html: htmlContent,
      attachments: attachments,
   };

   try {
      await transport.sendMail(mailOptions);
      const newCertif = await prisma.certifRequest.create({
         data: {
            email: email?.toString() || "",
            name: name?.toString() || "",
            brand: brand?.toString() || "",
            year: year?.toString() || "",
            serialn: serialN?.toString() || "",
            description: description?.toString() || "",
            historic: historic?.toString() || "",
            address: address?.toString() || "",
            images: images,
         },
      });
      return NextResponse.json(newCertif);
   } catch (err) {
      const message = "Erreur lors de l'envoi du mail de requete certif.";
      return NextResponse.json(
         { message, error: err },
         { status: 500 }
      );
   }
}
