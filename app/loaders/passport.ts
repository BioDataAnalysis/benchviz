import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUsersRepository } from "../repositories";
import { User } from "../entities";
import { UserService } from "../services";

export default async () => {

    passport.use(new LocalStrategy(
        { usernameField: "email" },
        async (email: string, password: string, doneCallback) => {
            try {
                const user = await UserService.login(email, password);
                return doneCallback(null, user);
            } catch (error) {
                return doneCallback(error);
            }
        }
    ));

    passport.serializeUser((user: User, doneCallback) => {
        return doneCallback(null, user.id);
    });

    passport.deserializeUser(async (userId: number, doneCallback) => {
        try {
            const user = await getUsersRepository().findOneOrFail(userId);
            doneCallback(null, user);
        } catch (error) {
            doneCallback(error);
        }
    });

    console.log("🦠 Passport loaded!");
};
