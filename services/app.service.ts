import express, {Application} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import {authRoute} from '../routes/auth.route'

export const mountRoutes = (app)=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use('/auth',authRoute)
}