const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();

app.use(express.json());
app.use("/api/users",require("./routes/users"))

const atlasurl = process.env.atlasuri;

mongoose.connect(atlasurl)
    .then(() => console.log("funziona cazzo"))
    .catch((error) => console.log("Connection error"));
    

app.listen(5000);