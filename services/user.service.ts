import bcrypt from 'bcrypt'

import {User} from '../models/user.model'
import { CreateUserDto} from "../dtos/user.dto";
import {ApiError} from "../utils/AppError";

export const createUser =async (createUserInputs:CreateUserDto)=>{
    const {email,name,password ,phone} = createUserInputs
    //1)hash password
    const hashedPassword = await bcrypt.hash(password,12)
    //2)create user
    const newUser = await User.create({
        name ,
        email,
        phone,
        password:hashedPassword
    })
   return newUser

}