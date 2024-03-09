import bcrypt from 'bcrypt'

import {User} from '../models/user.model'
import {CreateUserDto} from "../dtos/user.dto";
import {ApiError} from "../utils/AppError";

export const createUser =async (createUserInputs:CreateUserDto)=>{
    const {email,name,password ,phone} = createUserInputs
    //1)check if user exist before
    const existUser = await User.findOne({email:email})
    if(existUser !==null){
        throw new ApiError(
            "BadRequest",
            400,
            false,
            `user with this email exist before `
        )
    }
    //2)hash password
    const hashedPassword = await bcrypt.hash(password,12)
    //3)create user
    const newUser = await User.create({
    name ,
        email,
        phone,
        hashedPassword
    })

    await newUser.save()

    return newUser
}