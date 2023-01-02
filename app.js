const express = require("express");
const app = express();
const info = require("./Routes/routes");

const connectDB = require("./db/connect");
require("dotenv").config();
//middleware
app.use(express.json());
app.use(express.static("./public"));
//routes
app.use("/app", info);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.SECRET_URI);
    app.listen(port, () => {
      console.log("Connected to DB...");
      console.log(`listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error, "error");
  }
};

startServer();
