const nameObject = require("../middlewares/storeNames.middleware");

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

module.exports = { getRandomFirstName, getRandomLastName };
