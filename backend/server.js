const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./router")
require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true})); //origin: porta dove sarà situato il frontend, credentials:true per autorizzare il frontend
app.use(cookieParser());

app.use(router);

const atlasuri = process.env.atlasuri;

mongoose.connect(atlasuri)
    .then(() => console.log("Database connected..."))
    .catch((error) => console.log("Error:", error, "\n"));
    

app.listen(5000, ()=>{
    console.log("Server listening...")
});