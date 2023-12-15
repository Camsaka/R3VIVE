import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

interface CustomFile extends File {
   buffer: Buffer;
}

export async function POST(request: NextRequest) {
   const formData = await request.formData();

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

   // Convert FileList to an array
   const picturesArray: CustomFile[] = Array.from(formData);

   // Attachments array for nodemailer
   const attachments = picturesArray.map((file, index) => ({
      filename: `picture_${index + 1}.jpg`,
      content: file.buffer,
      encoding: "base64",
   }));

   const mailOptions: Mail.Options = {
      from: process.env.NODEMAILER_FROM,
      to: process.env.NODEMAILER_EMAIL,
      // cc: email, (uncomment this line if you want to send a copy to the sender)
      subject: `Message from me `,
      text: `${name}, ${brand}, ${serialN}, ${year}, ${description}, ${historic}, ${pictures}, ${address}, ${tokenid}`,
      attachments: attachments,
   };

   const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
         transport.sendMail(mailOptions, function (err) {
            if (!err) {
               resolve("Email sent");
            } else {
               reject(err.message);
            }
         });
      });

   try {
      await sendMailPromise();
      return NextResponse.json({ message: "Email sent" });
   } catch (err) {
      return NextResponse.json({ error: err }, { status: 500 });
   }
}
