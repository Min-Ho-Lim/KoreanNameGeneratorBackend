const express = require("express");
const firstNameModel = require("../models/firstname.model");
const lastNameModel = require("../models/lastname.model");
const router = express.Router();

//Get all Method
// router.get("/getAll", async (req, res) => {
//   try {
//     const data = await Model.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get one method but randomly from first name and last name

router.get("/getOne", async (req, res) => {
  try {
    const firstName = await firstNameModel.aggregate([
      { $sample: { size: 1 } },
    ]);
    const lastName = await lastNameModel.aggregate([{ $sample: { size: 1 } }]);
    res.json({ firstName, lastName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
