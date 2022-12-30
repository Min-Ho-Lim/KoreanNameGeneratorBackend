const express = require("express");
const router = express.Router();
const {
  getRandomFirstName,
  getRandomLastName,
  getRandomFullName,
} = require("../controllers/name.controller");

router.get("/getRandomFirstName", getRandomFirstName);
router.get("/getRandomLastName", getRandomLastName);
router.get("/getRandomFullName", getRandomFullName);

module.exports = router;
