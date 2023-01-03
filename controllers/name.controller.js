const firstNameModel = require("../models/firstname.model");
const lastNameModel = require("../models/lastname.model");

const getDefaultPage = async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "You are seeing Korean Name Generator API Backend",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
};

const getRandomFirstName = async (req, res) => {
  // if req.body.popularity is set
  const popularity = req.body.popularity || 100;

  if (popularity > 10000) {
    res.status(400).json({
      message: "popularity is too high. Limit is " + 10000,
    });
    return;
  }

  // return random first name from firstname model
  // limit will limit the number of documents to be returned
  // sample will return a random document among the limit
  const firstName = await firstNameModel.aggregate([
    { $limit: popularity },
    { $sample: { size: 1 } },
  ]);

  res.json(firstName);
};

// get random last name
const getRandomLastName = async (req, res) => {
  const popularity = req.body.popularity || 30;

  if (popularity > 288) {
    res.status(400).json({
      message: "popularity is too high. Limit is " + 288,
    });
    return;
  }

  // return random last name from lastName model
  // limit will limit the number of documents to be returned
  // sample will return a random document among the limit
  const lastName = await lastNameModel.aggregate([
    { $limit: popularity },
    { $sample: { size: 1 } },
  ]);

  res.json(lastName);
};

// get random full name
// TODO: Make them reusable
const getRandomFullName = async (req, res) => {
  const popularityLastName = req.body.popularityLastName || 30;

  if (popularityLastName > nameObject.lastName?.length) {
    res.status(400).json({
      message:
        "popularityLastName is too high. Limit is " +
        nameObject.lastName.length,
    });
    return;
  }

  const popularityFirstName = req.body.popularityFirstName || 100;

  if (popularityFirstName > nameObject.firstName?.length) {
    res.status(400).json({
      message:
        "popularityFirstName is too high. Limit is " +
        nameObject.firstName.length,
    });
    return;
  }

  const firstName = await firstNameModel.aggregate([
    { $limit: popularity },
    { $sample: { size: 1 } },
  ]);

  const lastName = await lastNameModel.aggregate([
    { $limit: popularity },
    { $sample: { size: 1 } },
  ]);

  res.json({ firstName, lastName });
};

module.exports = {
  getDefaultPage,
  getRandomFirstName,
  getRandomLastName,
  getRandomFullName,
};
