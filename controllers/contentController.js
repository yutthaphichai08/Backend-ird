const connection = require("../db/db");

exports.insertContent = (req, res) => {
  const { content } = req.body;
  if (!content) {
    console.log("Invalid input: Please fill in both content");
    return res.status(400).json({ error: "Please fill in both content" });
  }

  const query = "INSERT INTO comment(content) VALUES(?)";
  connection.query(query, [content], (err, results) => {
    if (err) {
      console.log("Error inserting data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({
      msg: "Data inserted successfully",
      insertedId: results.insertId,
    });
  });
};

exports.getAllContent = (req, res) => {
  const query = "SELECT * FROM comment";
  connection.query(query, (err, results) => {
    if (err) {
      console.log("Error fetching data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
};

exports.getContent = (req, res) => {
  const conId = req.params.id;
  const query = "SELECT * FROM comment WHERE id = ?";

  connection.query(query, [conId], (err, results) => {
    if (err) {
      console.log("Error fetching data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]); // Assuming you want a single user object
  });
};

exports.updateContent = (req, res) => {
  const conId = req.params.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content required" });
  }

  const query = "UPDATE comment SET content = ? WHERE id = ?";
  connection.query(query, [content, conId], (err, results) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      msg: "Content updated successfully",
      affectedRows: results.affectedRows,
    });
  });
};

exports.deleteContent = (req, res) => {
  const conId = req.params.id;

  const query = "DELETE FROM comment WHERE id = ?";
  connection.query(query, [conId], (err, results) => {
    if (err) {
      console.log("Error deleting data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({
      msg: "Content deleted successfully",
      affectedRows: results.affectedRows,
    });
  });
};
