const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../models/User");
require("dotenv").config();
const rateLimit = require("express-rate-limit")

const loginLimiter = rateLimit({
    windowMs: 5*60*1000,
    max: 3,
    message: {
        message: "Too many trials, try again in 5 minutes"
    },
    standardHeaders: true //forse da togliere
})

router.post("/", loginLimiter, async(req,res) => {
    try{
        const {mail, password} = req.body;
        if (typeof(mail) !== "string" || typeof(password) !== "string")
            return res.status(400).json({message: "Invalid input type"})

        const user = await User.findOne({mail: mail});
        
        if (!user){
            return res.status(400).json({message: "Email or Password not correct!"});
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return res.status(400).json({message: "Email or Password not correct!"});
        }

        const token = jwt.sign({id: user._id}, process.env.privateKey, {expiresIn: "1h"});

        res.status(200).json({message: "Successfully logged in!", token: token})
        
    } catch(error){

        res.status(500).json({message: "Server error"})
        console.log(error.message)
    }
});

module.exports = router;