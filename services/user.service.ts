import bcrypt from 'bcrypt'

import {User} from '../models/user.model'
import { CreateUserDto} from "../dtos/user.dto";
import {ApiError} from "../utils/AppError";

export const createUser =async (createUserInputs:CreateUserDto)=>{
    const {email,name,password ,phone} = createUserInputs

    //1)create user
    const newUser = await User.create({
        name ,
        email,
        phone,
        password:password
    })
   return newUser

}