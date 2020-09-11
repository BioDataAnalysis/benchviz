import express from "express";
import session from "express-session"
import config from "../config";
import { v4 as uuidv4 } from "uuid";

export default async (app: express.Application) => {

    app.use(session({
        genid: () => uuidv4(),
        secret: config.session_secret,
        resave: false,
        saveUninitialized: true,
    }));

    app.get("/", (request: express.Request, response: express.Response): void => {
        response.send("Hi!");
        console.log(request.sessionID);
    });

    app.post("/api/v1/login", (request: express.Request, response: express.Response): void => {
        console.log();
    });

    app.post("/api/v1/submission", (request: express.Request, response: express.Response): void => {
        console.log(request);
    });
};
