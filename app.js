const express = require("express");
const contentRoute = require("./routes/contentRoute");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001; // ใช้พอร์ตจาก .env หรือ 3001

app.use(cors());
app.use(express.json());

app.use("/api", contentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api`);
});
