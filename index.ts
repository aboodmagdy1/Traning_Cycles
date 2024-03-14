import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction, response } from "express";
import { ApiError } from "./utils/AppError";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { mountRoutes } from "./services/app.service";
import { connectToDB } from "./db/db.config";

connectToDB();
const app = express();
mountRoutes(app);
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

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on  ${port}`);
});

// may come from front-end side or back-end side because of promises

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  console.warn("UNHANDLED REJECTION! 💥 Shutting down...");
  //when server response to all other requests
  server.close(() => {
    console.error("Sutting down");
    //terminate the process
    process.exit(1); // in the server i host on it there is a tolls to restart server
  });
});