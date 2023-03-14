import dotenv from "dotenv";

dotenv.config();

const {
    PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    SECRET
} = process.env;

export {
    PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    SECRET
};
