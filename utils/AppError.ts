import { StatusCodes } from "http-status-codes";

// i make this base to make it easy to customize some errors 
class baseError extends Error {
  public  name: string;
  public  statusCode: StatusCodes;
  public  isOperational: boolean;
  public  status: string;

  constructor(
    name: string,
    statusCode: StatusCodes,
    message: string,
    isOperational: boolean
  ) {
    super(message);
    this.name = name;
    this.status = `${statusCode}`.startsWith('4')?'fail':'error' || 'error'
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

export class ApiError extends baseError {
  //as default error values
  constructor(
    name:string ='ApiError',
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational = true,
    message = "internal server error"
  ) {
    super(name, statusCode, message, isOperational);
  }
}
