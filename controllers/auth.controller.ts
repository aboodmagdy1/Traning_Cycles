import {Request, Response , NextFunction} from "express";
import {plainToClass} from 'class-transformer'
import {validate} from 'class-validator'

import {SignUpDto,CreateUserDto} from "../dtos/user.dto"
import {createUser} from "../services/user.service";
import {User} from "../models/user.model";
import {ApiError} from "../utils/AppError";

export const signUp = async (req:Request,res:Response,next:NextFunction)=>{

    //1)check if any validation errors
    const singupInputs =plainToClass(SignUpDto,req.body)
    const inputErrors =  await validate(singupInputs,{
        validationError:{target:true}
    })

    if(inputErrors.length >0){
        return res.status(400).json(inputErrors)
    }



    //2)check if user exist before
    const {name,phone,password,email} = singupInputs
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


