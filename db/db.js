const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "1111",
  database: "db",
});

// เชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// ส่งออกการเชื่อมต่อ
module.exports = db;
