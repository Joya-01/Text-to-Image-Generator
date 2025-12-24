import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const client = new Pool({
    connectionString: process.env.POSTGRE_URL,
    ssl: { rejectUnauthorized: false } // Helps with some cloud DB connection issues
});

// Test the connection when the server starts
client.connect()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));

export default client;