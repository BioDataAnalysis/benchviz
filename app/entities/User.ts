import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Session } from ".";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Session[];

};
