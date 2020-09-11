import express from "express";
import databaseLoader from "./database";
import passportLoader from "./passport";
import expressLoader from "./express";
import { getUsersRepository } from "../repositories";
import { User } from "../entities";


export default async (app: express.Application) => {
    await databaseLoader();

    await passportLoader();

    await expressLoader(app);

    const exists = getUsersRepository().findOne(1);

    if (!exists) {
        const temporaryAdminUser = new User();
        temporaryAdminUser.id = 1;
        temporaryAdminUser.email = "adrian@castro.te";
        temporaryAdminUser.password = "Password";
        await getUsersRepository().save(temporaryAdminUser);
    }
};
