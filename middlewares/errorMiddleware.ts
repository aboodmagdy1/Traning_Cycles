import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/AppError";
import { Request, Response, NextFunction } from "express";

const sendDevError = (err: ApiError, res: Response) => {
  res.status(err.statusCode).json({
    error: err.name,
    status: err.status,
    message: err.message,
    isOperational: err.isOperational,
    stack: err.stack,
  });
};

const sendProdError = (err: ApiError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const globalErrorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    if (error.isOperational) {
      sendDevError(error, res);
    } else {
      //log error for debuging(for me as developer ) i may use loging or do some notification to admin
      console.log("operational Error : " + error);

      //send generic respose (to user )
      sendProdError(
        {
          name: "InternalServerError",
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          status: "error", // in the production mdoe this status will be fail (just to notic)
          isOperational: false,
          message: "Internal Server error",
        },
        res
      );
    }
  } else {
    sendProdError(error, res);
  }
};
