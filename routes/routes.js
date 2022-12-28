const express = require("express");
const router = express.Router();
const {
  getRandomFirstName,
  getRandomLastName,
} = require("../controllers/name.controller");

router.get("/getRandomFirstName", getRandomFirstName);
router.get("/getRandomLastName", getRandomLastName);
router.get("/getRandomFullName");

module.exports = router;
