import express from "express";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {ForgetPasswordDto, LogInDto, ResetPasswordDto, SignUpDto,VerifyCodeDto} from "../dtos/auth.dto";
import {logIn, signUp ,forgetPassword,verifyResetCode, resetPassword} from "../controllers/auth.controller";

export const authRouter = express.Router()

authRouter.post('/signup',validationMiddleware(SignUpDto),signUp)
authRouter.post('/login',validationMiddleware(LogInDto),logIn)
authRouter.post('/password/forget',validationMiddleware(ForgetPasswordDto),forgetPassword)
authRouter.post('/password/verifyCode',validationMiddleware(VerifyCodeDto),verifyResetCode)
authRouter.post('/password/reset',validationMiddleware(ResetPasswordDto),resetPassword)





