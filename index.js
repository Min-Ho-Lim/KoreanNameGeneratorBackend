require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
mongoose.set("strictQuery", true);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.get("/", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "You are seeing Korean Name Generator API Backend",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

const routes = require("./routes/routes");

app.use("/", routes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
