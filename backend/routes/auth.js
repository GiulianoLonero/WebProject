const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../models/User");

router.post("/", async(req,res) => {
    try{
        const {mail, password} = req.body;

        const user = await User.findOne({mail: mail});
        
        if (!user){
            return res.status(400).json({message: "Email or Password not correct!"});
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return res.status(400).json({message: "Email or Password not correct!"});
        }

        const token = jwt.sign({id: user._id}, "Francesco Marzano", {expiresIn: "1h"});

        res.status(200).json({message: "Successfully logged in!", token: token})
        
    } catch(error){

        res.status(500).json({message: "Server error", error: error.message})
    }
});

module.exports = router;