import { Entity, PrimaryGeneratedColumn, OneToMany, Column, PrimaryColumn, BeforeInsert } from "typeorm"

import { Session } from ".";
import { UserService } from "../services";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Session[];

    @BeforeInsert()
    public hashPassword = (): void => {
        this.salt = UserService.generateRandomSalt();
        this.password = UserService.generatePasswordHash(this.password, this.salt);
    }

    public passwordMatch = (passwordToCompare: string): boolean => {
        return this.password === UserService.generatePasswordHash(passwordToCompare, this.salt);
    }

    public toObject = () => {
        return {
            id: this.id,
            email: this.email
        };
    }

};
