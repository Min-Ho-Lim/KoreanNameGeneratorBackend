const nameObject = require("../middlewares/storeNames.middleware");

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
  if (!nameObject.firstName) {
    res.status(400).json({
      message: "nameObject.firstName is not set",
    });
    return;
  }

  // if req.body.popularity is set
  const popularity = req.body.popularity || 100;

  if (popularity > nameObject.firstName?.length) {
    res.status(400).json({
      message:
        "popularity is too high. Limit is " + nameObject.firstName.length,
    });
    return;
  }

  // return random first name from nameObject.firstName array
  const firstName =
    nameObject.firstName[Math.floor(Math.random() * popularity)];
  res.json(firstName);
};

// get random last name
const getRandomLastName = async (req, res) => {
  if (!nameObject.lastName) {
    res.status(400).json({
      message: "nameObject.lastName is not set",
    });
    return;
  }
  // if req.body.popularity is set
  const popularity = req.body.popularity || 30;

  if (popularity > nameObject.lastName?.length) {
    res.status(400).json({
      message: "popularity is too high. Limit is " + nameObject.lastName.length,
    });
    return;
  }

  // return random first name from nameObject.firstName array
  const lastName = nameObject.lastName[Math.floor(Math.random() * popularity)];
  res.json(lastName);
};

// get random full name
// TODO: Make them reusable
const getRandomFullName = async (req, res) => {
  if (!nameObject.firstName || !nameObject.lastName) {
    res.status(400).json({
      message: "nameObject.firstName or nameObject.lastName is not set",
    });
    return;
  }

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

  // return random first name from nameObject.firstName array
  const firstName =
    nameObject.firstName[Math.floor(Math.random() * popularityFirstName)];

  // return random first name from nameObject.firstName array
  const lastName =
    nameObject.lastName[Math.floor(Math.random() * popularityLastName)];

  res.json({ firstName, lastName });
};

module.exports = {
  getDefaultPage,
  getRandomFirstName,
  getRandomLastName,
  getRandomFullName,
};
