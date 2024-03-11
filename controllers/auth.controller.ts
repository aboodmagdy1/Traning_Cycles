import {Request, Response , NextFunction} from "express";
import {createUser} from "../services/user.service";
import {User} from "../models/user.model";
import {ApiError} from "../utils/AppError";
import bcrypt from "bcrypt";
import {createToken} from "../utils/createToken";
import {use} from "passport";

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
