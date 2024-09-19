const express = require("express");
const contentRoute = require("./routes/contentRoute");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

app.use("/api", contentRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
