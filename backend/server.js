const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const app = express();

app.use(express.json());
app.use("/api/users",require("./routes/users"))
app.use("/api/auth",require("./routes/auth"))
app.use(cookieParser());

const atlasuri = process.env.atlasuri;

mongoose.connect(atlasuri)
    .then(() => console.log("funziona cazzo"))
    .catch((error) => console.log("Error:", error, "\n"));
    

app.listen(5000);