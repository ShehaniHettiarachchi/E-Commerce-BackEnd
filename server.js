const express = require("express"); //Express web server framework
const mongoose = require("mongoose"); //MongoDB
const bodyParser = require("body-parser"); //Parses the request body to be a readable json format
const cors = require("cors"); //Cross origin resource sharing
const dotenv = require("dotenv"); //Loads environment variables from a .env file into process.env
const app = express(); //Initialize the Express application
require("dotenv").config(); //Loads environment variables from a .env file into process.env

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL; // mongoDB URL

mongoose.connect(URL, {});

const connection = mongoose.connection; //mongoDB connection
connection.once("open", () => {
  console.log("MongoDB Database Connection Successfull"); //Display in console if
});


const CustomerRouter = require("./routes/CustomerRoutes.js");
app.use("/customer", CustomerRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port number : ${PORT}`); //Display in console if server is running
});






