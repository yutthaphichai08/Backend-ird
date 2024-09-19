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
      res.status(500).json({ err: "Internal Server Error" });
    } else {
      res.json({
        msg: "Data inserted successfully",
        insertedId: results.insertId,
      });
    }
  });
};

exports.getAllContent = (req, res) => {
  const query = "SELECT * FROM comment";
  connection.query(query, (err, results) => {
    if (err) {
      console.log("Error fetching data:", err);
      res.status(500).json({ err: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

exports.getContent = (req, res) => {
  const conId = req.params.id;
  const query = "SELECT * FROM comment WHERE id = ?";

  connection.query(query, [conId], (err, results) => {
    if (err) {
      console.log("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(results[0]); // Assuming you want a single user object
      }
    }
  });
};

exports.updateContent = (req, res) => {
  const conId = req.params.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ err: "content required" });
  }

  const query = "UPDATE comment SET content = ? WHERE id = ?";

  connection.query(query, [content, conId], (err, results) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).json({ err: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json({
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
      console.log("Error delete data:", err);
      res.status(500).json({ err: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ msg: "User not found" });
      } else {
        res.json({
          msg: "Content delete successfully",
          affectedRows: results.affectedRows,
        });
      }
    }
  });
};
