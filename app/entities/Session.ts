import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { User } from ".";

@Entity()
export default class Session {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.sessions)
    user: User;

};
