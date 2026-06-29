const User = require("../models/User");
const bcrypt = require("bcrypt")

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

const getUser = async(req,res) => {
    userId = req.params.id
    try {
        const user = await User.findById(userId).select("-password -refreshToken -email")
        if (!user) return res.status(404).json({message: "User not found"})
        const safeUser = {
            name: user.name,
            lastName: user.lastName,
            savedEvents: user.savedEvents
        }
        return res.status(200).json({message: "User found", user: safeUser})
    }catch(error){
        res.status(500).json({message: "Error during creation", error: error.message});
    }
}

const editUser = async (req,res)=>{
    const userId = req.user.id
    
    try{
        const salt = await bcrypt.genSalt(10);

        if (!req.body.oldPassword) return res.status(400).json({ message: "Insert old Password" });

        let foundUser = await User.findById(userId);

        if (!foundUser) return res.status(404).json({ message: "User not found" });

        let userNewData = {
            name:req.body.name,
            lastName: req.body.lastName
        }

        const isMatch = await bcrypt.compare(req.body.oldPassword, foundUser.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        if (req.body.password){
            if(req.body.password !== req.body.confirmPassword){
                return res.status(400).json({message: "Password mismatch (aura)"})
            }else{
             const hashedPass = await bcrypt.hash(req.body.password,salt)
             userNewData.password = hashedPass
            }
        }
        
        foundUser = await User.findByIdAndUpdate(userId,userNewData)
        return res.status(200).json({message: "Successful update"})
    }catch(error){
        return res.status(500).json({message:"Server error"})
    }
}

module.exports = {
    register,
    getUser,
    editUser
};
