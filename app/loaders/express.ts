import express from "express";
import session from "express-session"
import passport from "passport";
import bodyParser from "body-parser";
import HttpStatus from "http-status-codes";

import config from "../config";
import { v4 as uuidv4 } from "uuid";
import SessionStore from "../config/SessionStore";
import { User } from "../entities";

export default async (app: express.Application) => {

    // watches for `application/x-www-form-urlencoded` Content-Type
    app.use(bodyParser.urlencoded({ extended: false }));
    // watches for `application/json` Content-Type
    app.use(bodyParser.json());

    app.use(session({
        genid: () => uuidv4(),
        secret: config.session.secret,
        resave: false,
        saveUninitialized: true,
        store: new SessionStore(),
        cookie: { maxAge: config.session.expires }
    }));

    app.use(passport.initialize())
    app.use(passport.session())

    app.get("/", (request: express.Request, response: express.Response): void => {
        response.send("Hi!");
    });

    app.post("/api/v1/login", (request: express.Request, response: express.Response, next: express.NextFunction): void => {
        passport.authenticate("local", (error: Error, user: User, fail, authStatus) => {
            if (error) {
                return response.status(HttpStatus.UNAUTHORIZED).send(error);
            }
            if (fail) {
                return response.status(authStatus).send(new Error(fail.message));
            }

            // It is necessary to call the login, otherwise
            // passport will not initiate the user serialization
            request.login(user, (_loginError) => {
                return response.status(HttpStatus.OK).send(user.toObject());
            });
        })(request, response, next);
    });

    // TODO: add the submission handling
    app.post("/api/v1/submission", (request: express.Request, response: express.Response): void => {
        console.log(request);
    });

    console.log(`🦠 Loaded Express`);
};
