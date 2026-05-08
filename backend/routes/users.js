const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

router.post("/", async(req,res) => {
    try{
        const userDatas = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(userDatas.password, salt);
        
        const newUsers = new User({
            name: userDatas.name,
            lastName: userDatas.lastName,
            mail: userDatas.mail,
            password: hashedPass,
            shoppingList: null,
            ticketList: null
        });

        const userSaved = await newUsers.save()

        res.status(201).json(userSaved);
    } catch(error){
        res.status(400).json({message: "Error during creation", error: error.message});
    }
});

module.exports = router;
