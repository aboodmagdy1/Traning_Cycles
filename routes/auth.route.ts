import express from "express";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {ForgetPasswordDto, LogInDto, SignUpDto} from "../dtos/auth.dto";
import {logIn, signUp ,forgetPassword} from "../controllers/auth.controller";

export const authRouter = express.Router()

authRouter.post('/signup',validationMiddleware(SignUpDto),signUp)
authRouter.post('/login',validationMiddleware(LogInDto),logIn)
authRouter.post('/password/forget',validationMiddleware(ForgetPasswordDto),forgetPassword)





