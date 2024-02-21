import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
    host:process.env.NODE_host,
    user:process.env.NODE_root,
    password:process.env.NODE_password,
    database:process.env.NODE_database
})