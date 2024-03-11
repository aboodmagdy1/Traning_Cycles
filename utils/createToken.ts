import * as jwt from "jsonwebtoken";
import {Secret} from "jsonwebtoken";

export const createToken =  (id)=>{
    const token = jwt.sign({sub:id},process.env.JWT_SECRET as Secret,{expiresIn:'1h'})
    return token
}