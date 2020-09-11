import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
};
