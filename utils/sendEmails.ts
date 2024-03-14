import * as mailer  from 'nodemailer'
import {isValidationOptions} from "class-validator";
import { EmailOptionsDto } from '../dtos/auth.dto';
import { ApiError } from './AppError';


export  const sendEmail = async (options:EmailOptionsDto)=>{

    // service to send form it
    const  transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,// email to send from it
            pass:process.env.EMAIL_PASSWORD,//from app access in the gmail account
        }
    })
    const mailOptions = {
        from: "Traning Cycle <aboodnodejs@gmail.com>",
        to: options.to,
        subject: options.subject,
        text: options.message,
    };

    //3)send the email
    try{

        await transporter.sendMail(mailOptions);
    }catch(e){
        console.log(e)
        throw new ApiError('ServerError',500,false,'error sending email ')
    }
}