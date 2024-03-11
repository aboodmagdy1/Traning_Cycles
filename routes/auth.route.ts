import express from "express";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {SignUpDto} from "../dtos/user.dto";
import {signUp} from "../controllers/auth.controller";

export const authRoute = express.Router()

authRoute.post('/signup',validationMiddleware(SignUpDto),signUp)





