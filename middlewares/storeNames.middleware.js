const firstNameModel = require("../models/firstname.model");
const lastNameModel = require("../models/lastname.model");

const nameObject = {};

// create an array to store all the last names and first names
const generateNameObject = async () => {
  try {
    const lastName = await lastNameModel.find();
    nameObject.lastName = lastName;
    const firstName = await firstNameModel.find();
    nameObject.firstName = firstName;
  } catch (error) {
    console.error(error);
    return null;
  }
};
generateNameObject();

module.exports = nameObject;
