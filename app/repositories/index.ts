import { getCustomRepository } from "typeorm";

import SessionsRepository from "./SessionsRepository";
import UsersRepository from "./UsersRepository";

export const getUsersRepository = (): UsersRepository => {
    return getCustomRepository(UsersRepository);
};

export const getSessionsRepository = (): SessionsRepository => {
    return getCustomRepository(SessionsRepository);
};
