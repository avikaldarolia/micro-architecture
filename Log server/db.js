import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
	user: process.env.DB_USERNAME,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
});

export const query = (text, params) => pool.query(text, params);
