const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "1111",
  database: "db",
});

// ฟังก์ชันสำหรับเชื่อมต่อกับฐานข้อมูล
const connectWithRetry = () => {
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed, retrying in 5 seconds...", err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.log("Connected to MySQL database.");
    }
  });
};

// เริ่มต้นการเชื่อมต่อ
connectWithRetry();

// ส่งออกการเชื่อมต่อ
module.exports = db;
