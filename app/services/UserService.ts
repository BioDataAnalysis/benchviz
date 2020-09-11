import { randomBytes, createHash } from "crypto";

import { getUsersRepository } from "../repositories";
import { User } from "../entities";

export default class UserService {
    static login = async (email: string, password: string): Promise<User> => {
        const user = await getUsersRepository().findOne({
            email: email,
        });

        if (!user) {
            throw new Error("No user was found with the given email");
        }

        if (user.passwordMatch(password)) {
            return user;
        }

        throw new Error("No user match with the given credentials");
    }

    static generateRandomSalt = (): string => {
        return randomBytes(Math.ceil(16)).toString("hex");
    }

    static generatePasswordHash = (password: string, salt: string): string => {
        return createHash("sha256").update(password + salt).digest("hex");
    }
}
