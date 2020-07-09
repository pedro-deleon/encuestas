import {Request, Response} from "express";
const nodemailer = require("nodemailer");

export async function testmail(req:Request, res:Response){

  // create reusable transporter object using the default SMTP transport

  try{
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dleonmxn@gmail.com",
        pass: process.env.PASSGMAIL
      }
    });


    let info = await transporter.sendMail({
      from: '"Pedro de León" <pedro.deleonr@uanl.mx>', // sender address
      to: "pedro.deleonr@uanl.mx", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    res.sendStatus(200);
  }catch(e){
    console.log(e)
    res.status(200).json({Error: e})
  }



}
