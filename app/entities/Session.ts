import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, PrimaryColumn, Column, JoinColumn } from "typeorm"
import session from "express-session";

import { User } from ".";
import config from "../config";

@Entity()
export default class Session {

    @PrimaryColumn()
    id: string;


    @Column({ nullable: true })
    path: string;

    @Column({ default: null })
    maxAge: number;

    @Column({ default: null })
    expires: Date;

    @ManyToOne(() => User, (user) => user.sessions)
    @JoinColumn()
    user: User;

    public fromSessionData = (sessionData: Express.SessionData): void => {
        this.path = sessionData.cookie.path;
        this.maxAge = sessionData.cookie.maxAge || config.session.expires;
        this.expires = (typeof sessionData.cookie.expires == "boolean")
            ? new Date(1970, 1, 1)
            : sessionData.cookie.expires;
    }

    public toSessionData = (): Express.SessionData => {
        let cookie = {
            originalMaxAge: this.maxAge,
            path: this.path,
            maxAge: this.maxAge,
            httpOnly: false,
            expires: this.expires,
        };

        if (!this.user) {
            return {
                cookie: cookie
            };
        }

        return {
            cookie: cookie,
            passport: {
                user: this.user.id
            }
        };
    }
};
