import express, {Application} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import {signUp} from '../controllers/auth.controller'

export const mountRoutes = (app)=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.post("/signup", signUp);
}