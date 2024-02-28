import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";

import { ApiError } from "./utils/AppError";
import { globalErrorHandler } from "./middlewares/errorMiddleware";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  res.send("hello abood");
});

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
  console.log(`Server is running on port ${port}`);
});

// may come from front-end side or back-end side because of promises
process.on("unhandledRejection", (reason) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  //when server response to all other requests
  server.close(() => {
    console.log("Sutting down");
    //terminate the process
    process.exit(1); // in the server i host on it there is a tolls to restart server
  });
});
