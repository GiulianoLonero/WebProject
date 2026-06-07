const User = require("../models/User");
const bcrypt = require("bcrypt")

const verify = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password -refreshToken");

        if(!user){
            return res.status(404).json({message: "Access denied"});
        }
        return res.status(200).json({message: "Access granted", userData: user})
    }catch(error){
        console.error("Verification error:", error.message);
        return res.status(500).json({message: "Server error"});
    }
};

// Create User
const register = async(req,res) => {
    try{
        const userData = req.body;
        if (!userData.name || !userData.lastName || !userData.mail || !userData.password || !userData.confirmPassword)
            return res.status(400).json({message: "Missing infos"})
        if (userData.password !== userData.confirmPassword)
            return res.status(400).json({message: "Password mismatch (aura)"})
        const existingUser = await User.findOne({mail: userData.mail})
        if (existingUser)
            return res.status(400).json({message: "User already existing"})
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(userData.password, salt);
        
        const newUsers = new User({
            name: userData.name,
            lastName: userData.lastName,
            mail: userData.mail,
            password: hashedPass,
        });

        const userSaved = await newUsers.save()
        const userSavedWP = {
            name: userSaved.name,
            lastName: userSaved.lastName,
            mail: userSaved.mail
        } //WP=WITHOUT PASSWORD AHAHAHAHAHAHHA

        res.status(201).json(userSavedWP);
    } catch(error){
        res.status(500).json({message: "Error during creation", error: error.message});
    }
};

module.exports = {
    verify,
    register
};
