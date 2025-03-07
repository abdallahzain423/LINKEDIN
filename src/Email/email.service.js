import nodemailer  from 'nodemailer'
import { EventEmitter } from 'events';

export const sendEmailServices =async ({
    to,subject,html
})=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAILER_USER,
              pass: process.env.MAILER_PASSWORD,
            },
            tls:{
                rejectUnauthorized: false,
            }
          });

          const info = await transporter.sendMail({
            from: `"gues whaaat 👻" <${process.env.MAILER_USER}>`, // sender address
            to, 
            subject,
            html,
          });
        
    } catch (error) {
        console.log('went error email',error);
        return res.status(500).json("error",error)
        
        
    }
}

export const emitter = new EventEmitter()
emitter.on('sendEmail',(...args)=>{
    const{to ,subject,html} = args[0]

    sendEmailServices({
        to,
        subject,
        html
    })
})