import session from "express-session";

import { getSessionsRepository } from "../repositories";
import { Session } from "../entities";
import { MoreThanOrEqual } from "typeorm";
import config from ".";

export default class SessionStore extends session.Store {
    public get = async (sessionId: string, callback: (error: any, session?: Express.SessionData | null) => void): Promise<void> => {
        // looking for the session, and checking if the expire date is still more than
        // the current date
        const session: Session | undefined = await getSessionsRepository().findOne({
            where: {
                id: sessionId,
                expires: MoreThanOrEqual(new Date())
            }
        });

        if (!session) {
            callback(null);
            return;
        }

        callback(null, session.toSessionData());
    }

    public set = async (sessionId: string, sessionData: Express.SessionData, callback?: (error?: any) => void): Promise<void> => {
        try {
            const sessionToSave = new Session();
            sessionToSave.id = sessionId;
            sessionToSave.fromSessionData(sessionData);

            await getSessionsRepository().save(sessionToSave);
            if (callback) {
                callback(null);
            }
        } catch (saveError) {
            if (callback) {
                callback(saveError);
            }
        }
    }

    public destroy = async (sessionId: string, callback?: (error?: any) => void): Promise<void> => {
        try {
            await getSessionsRepository().delete(sessionId);
            if (callback) {
                callback(null);
            }
        } catch (deleteError) {
            if (callback) {
                callback(deleteError);
            }
        }
    }

    public length = async (callback: (error: any, length?: number | null) => void): Promise<void> => {
        try {
            const count = await getSessionsRepository().count();
            if (callback) {
                callback(null, count);
            }
        } catch (findError) {
            if (callback) {
                callback(findError);
            }
        }
    }

    public clear = async (callback?: (error?: any) => void): Promise<void> => {
        try {
            await getSessionsRepository().query(`DELETE FROM ${getSessionsRepository().metadata.tableName}`);
            if (callback) {
                callback(null);
            }
        } catch (deleteError) {
            if (callback) {
                callback(deleteError);
            }
        }
    }

    public touch = async (sessionId: string, sessionData: Express.SessionData, callback?: (error?: any) => void): Promise<void> => {

        try {
            let existingSession: Session = await getSessionsRepository().findOneOrFail(sessionId);

            existingSession.maxAge = sessionData.cookie.maxAge || config.session.expires;
            existingSession.expires = (typeof sessionData.cookie.expires == "boolean")
                ? new Date(1970, 1, 1)
                : sessionData.cookie.expires;

            await getSessionsRepository().save(existingSession);

            if (callback) {
                callback(null);
            }
        } catch (saveError) {
            if (callback) {
                callback(saveError);
            }
        }
    }
};
