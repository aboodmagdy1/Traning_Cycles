import dotenv from "dotenv";
dotenv.config();
import express,{ Request, Response, NextFunction} from "express";
import { ApiError } from "./utils/AppError";
import { globalErrorHandler } from "./middlewares/errorMiddleware";
import {mountRoutes} from "./services/app.service";

const app = express();

mountRoutes(app)
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new ApiError(
      "BadRequest",
      400,
      false,
      `can't find this route : ${req.originalUrl}`
    )
  );
});
// expected errors (prgram error)
app.use(globalErrorHandler);

const port =  process.env.PORT||3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// may come from front-end side or back-end side because of promises
process.on("unhandledRejection", (reason) => {
  console.warn("UNHANDLED REJECTION! 💥 Shutting down...");
  //when server response to all other requests
  server.close(() => {
    console.error("Sutting down");
    //terminate the process
    process.exit(1); // in the server i host on it there is a tolls to restart server
  });
});
