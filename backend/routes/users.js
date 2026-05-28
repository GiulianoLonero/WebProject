const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")
const verifyToken = require("../middleware/verifyToken");

// GET Verify
router.get("/verify", verifyToken, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password -refreshToken");

        if(!user){
            return res.status(404).json({message: "Access denied"});
        }
        return res.status(200).json({message: "Access granted", userData: user})
    }catch{
        return res.status(500).json({message: "Server error"});
    }
});

// Create User
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
