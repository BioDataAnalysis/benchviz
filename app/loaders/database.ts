import { createConnection } from "typeorm";
import config from "../config";

export default async () => {
    await createConnection(config.db);

    console.log(`🦠 Database of type ${config.db.type} loaded succesfully`);
};
