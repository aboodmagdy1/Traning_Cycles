import {Request, Response , NextFunction} from "express";
import {createUser} from "../services/user.service";
import {User} from "../models/user.model";
import {ApiError} from "../utils/AppError";
import bcrypt from "bcrypt";
import {createToken} from "../utils/createToken";
import {generateResetCode} from "../utils/resetCode";
import {sendEmail} from "../utils/sendEmails";
import * as crypto from "crypto";

export const signUp = async (req:Request,res:Response,next:NextFunction)=>{

    //1) validate the inputs (with middleware)
    //2)check if user exist before
    const {name,phone,password,email} = req.body
    const existUser = await User.findOne({email:email})
    if(existUser !==null){
     return    next(new ApiError(
            "BadRequest",
            400,
            true,
            `user with this email exist before `
        ))
    }

    //3)create user
    const user =  await createUser({name,phone,email,password})
    //4)send response
    return res.status(201).json({
        status:"success",
        user
    })
}

export const logIn = async (req:Request,res:Response,next:NextFunction)=>{
    //1)validation with (LoginDto)
    //2)find user
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    //3)check user password
    if (!user || !(await bcrypt.compare(password  ,user.password as string))){
     return res.status(400).json({
         status:'fail',
         message:"email or password is not correct"
     })
    }
    //4)create token
    const token =  createToken(user._id)
    //5)send response

    res.status(200).json({
            status:"success",
            token:token
        })
}


export const forgetPassword =  async (req:Request,res:Response,next:NextFunction)=>{
   //1)validate inputs by validation middleware
   //2)take email from user
    const {email} = req.body
   //3)check if user with this email is exist
    const user = await User.findOne({email:email})
    if(user === null){
        return res.status(400).json({
            status:'failed',
            message:"incorrect email (no user with this email ) "
        })
    }
   //4)generate reset code and save it in DB(cache soon)  it
    const {hashedResetCode,expireIn,code} = generateResetCode()
    user.resetCode = hashedResetCode
    user.resetCodeExpiry = expireIn
     await user.save()
   //5)send reset code by email
    const emailMessage =` Hi ${user.name},
     \nWe received a request to reset the password on your Traning  Account 
     \n\n ${code}
      \n\n Enter this code to complete the reset password operation `;
    try{
        await sendEmail({
            to:email,
            subject:"Your Password Reset Code (valid for 5 minutes) ",
            message:emailMessage
        })
    }
    catch (e){
        user.resetCode= undefined
        user.resetCodeExpiry = undefined
        await user.save()

        return    next(new ApiError(
            "BadRequest",
            400,
            true,
            ` faield to send Email  `
        ))
    }
   // 6) send resposne to user
    return res.status(200).json({
        status:'success',
        message:"please check you email"
    })
}

export const verifyResetCode =  async (req:Request,res:Response,next:NextFunction)=>{
    //1)validate inputs by validation middleware
    //2)take email from user
    const {code} = req.body

    //3) hash code to compare it with the hased one in db
     const hashedCode = crypto.createHash('sha256').update(code).digest('hex')
    //4)check if user with this code is exist
    const user = await User.findOne({resetCode:hashedCode,resetCodeExpiry:{$gt:Date.now()}})
    if(user === null){
        return next(new ApiError('BadRequest',400,true,'reset code invalid or expired '))
    }

    user.resetCodeVerified = true
    await user.save()

    //5)send response
    return res.status(200).json({
        status:'success',
        message:"code verified successfully"
    })

 
}




