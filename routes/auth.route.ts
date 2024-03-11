import express from "express";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {LogInDto, SignUpDto} from "../dtos/user.dto";
import {logIn, signUp} from "../controllers/auth.controller";

export const authRouter = express.Router()

authRouter.post('/signup',validationMiddleware(SignUpDto),signUp)
authRouter.post('/login',validationMiddleware(LogInDto),logIn)





