import dotenv from "dotenv";
import { Pool } from "pg";
import {
    NODE_ENV,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_USER
} from "../config/config";

dotenv.config();

let pool: Pool;

if (NODE_ENV === "test") {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
} else {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

export default pool;
