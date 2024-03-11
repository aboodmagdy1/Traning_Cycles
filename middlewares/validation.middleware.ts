import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {SignUpDto} from "../dtos/user.dto";

export const validationMiddleware = (validationDto) => async (req, res, next) => {
    //1)check if any validation errors
    const inputs =plainToClass(validationDto,req.body)
    const inputErrors =  await validate(inputs,{
        validationError:{target:true}
    })

    if(inputErrors.length >0){
        return res.status(400).json({errors:inputErrors})
    }
    next()
};