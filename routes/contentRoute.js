const express = require("express");
const router = express.Router();
const {
  insertContent,
  getAllContent,
  getContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

// การเรียกใช้งาน
router.post("/insert", insertContent);
router.get("/content", getAllContent);
router.get("/content/:id", getContent);
router.put("/content/update/:id", updateContent);
router.delete("/delete/:id", deleteContent);

module.exports = router;
