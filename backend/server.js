const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors"); //middleware per la gestione dei cookie che passano da frontend a backend
require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true})); //origin: porta dove sarà situato il frontend, credentials:true per autorizzare il frontend
app.use(cookieParser());
app.use("/api/users",require("./routes/users"))
app.use("/api/auth",require("./routes/auth"))

const atlasuri = process.env.atlasuri;

mongoose.connect(atlasuri)
    .then(() => console.log("funziona cazzo"))
    .catch((error) => console.log("Error:", error, "\n"));
    

app.listen(5000);