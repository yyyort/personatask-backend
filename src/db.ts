import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "dotenv";
import { Client } from "pg";

config({ path: ".env" }); // or .env.local

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

export const db = drizzle(client);