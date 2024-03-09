import express,{Application, Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

export const mountRoutes = (app:Application)=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan("dev"));

    app.get("/", (req:Request, res:Response, next:NextFunction) => {
        res.send("hello");
    });
}