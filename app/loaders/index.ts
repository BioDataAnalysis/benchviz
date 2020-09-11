import express from "express";
import databaseLoader from "./database";
import passportLoader from "./passport";
import expressLoader from "./express";


export default async (app: express.Application) => {
    await databaseLoader();

    await passportLoader();

    await expressLoader(app);
};
