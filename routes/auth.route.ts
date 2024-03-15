import express from "express";
import rateLimit from "express-rate-limit";

import { validationMiddleware } from "../middlewares/validation.middleware";
import {
  ForgetPasswordDto,
  LogInDto,
  ResetPasswordDto,
  SignUpDto,
  VerifyCodeDto,
} from "../dtos/auth.dto";
import {
  logIn,
  signUp,
  forgetPassword,
  verifyResetCode,
  resetPassword,
} from "../controllers/auth.controller";

export const authRouter = express.Router();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many requests from this IP, please try again later. ",
});

authRouter.post("/signup", validationMiddleware(SignUpDto), signUp);
authRouter.post("/login", validationMiddleware(LogInDto), logIn);
authRouter.post(
  "/password/forget",
  limiter,
  validationMiddleware(ForgetPasswordDto),
  forgetPassword
);
authRouter.post(
  "/password/verifyCode",
  limiter,
  validationMiddleware(VerifyCodeDto),
  verifyResetCode
);
authRouter.post(
  "/password/reset",
  validationMiddleware(ResetPasswordDto),
  resetPassword
);
