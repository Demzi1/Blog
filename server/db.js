import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.DB_PW,
    database:"blog"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });