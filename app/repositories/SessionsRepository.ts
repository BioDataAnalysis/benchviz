import { EntityRepository, Repository } from "typeorm";
import { Session } from "../entities";

@EntityRepository(Session)
export default class SessionRepository extends Repository<Session> {
};
