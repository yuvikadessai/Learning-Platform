import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

// Create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,          // your MySQL username
  password: process.env.DB_PASSWORD,  // your MySQL password
  database: process.env.DB_DATABASE      // your database name
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database successfully!");
  }
});

export default db;
