const firstNameModel = require("../models/firstname.model");
const lastNameModel = require("../models/lastname.model");

const {
  fisrtNameConstant,
  lastNameConstant,
} = require("../constants/name.constant");

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
  const popularity = req.body.popularity || fisrtNameConstant.defaultPopularity;

  if (popularity > fisrtNameConstant.maxPopularity) {
    res.status(400).json({
      message:
        "popularity is too high. Limit is " + fisrtNameConstant.maxPopularity,
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
  const popularity = req.body.popularity || lastNameConstant.defaultPopularity;

  if (popularity > lastNameConstant.maxPopularity) {
    res.status(400).json({
      message:
        "popularity is too high. Limit is " + lastNameConstant.maxPopularity,
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
  const popularityLastName =
    req.body.popularityLastName || lastNameConstant.defaultPopularity;

  if (popularityLastName > lastNameConstant.maxPopularity) {
    res.status(400).json({
      message:
        "popularityLastName is too high. Limit is " +
        lastNameConstant.maxPopularity,
    });
    return;
  }

  const popularityFirstName =
    req.body.popularityFirstName || fisrtNameConstant.defaultPopularity;

  if (popularityFirstName > fisrtNameConstant.maxPopularity) {
    res.status(400).json({
      message:
        "popularityFirstName is too high. Limit is " +
        fisrtNameConstant.maxPopularity,
    });
    return;
  }

  const firstName = await firstNameModel.aggregate([
    { $limit: popularityFirstName },
    { $sample: { size: 1 } },
  ]);

  const lastName = await lastNameModel.aggregate([
    { $limit: popularityLastName },
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
