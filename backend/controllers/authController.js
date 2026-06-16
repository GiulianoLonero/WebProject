const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const User = require("../models/User");
require("dotenv").config();

const waitingTime = 5*60*1000

// Login
const login= async(req,res) => {
    try{
        const {mail, password} = req.body;

        // To avoid No SQL Injection
        if (typeof(mail) !== "string" || typeof(password) !== "string")
            return res.status(400).json({message: "Invalid input type"})

        // User control
        const user = await User.findOne({mail: mail}).populate("savedEvents");
        
        if (!user){
            return res.status(400).json({message: "Email or Password not correct!"});
        }

        // Trial limiter by trials
        if(user.lockUntil && user.lockUntil > Date.now()){
            const blockedFor = Math.ceil((user.lockUntil - Date.now()) / (1000 * 60));
            return res.status(423).json({ 
                message: `Blocked Account. Try again in ${blockedFor} minutes.`
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            user.failedLoginAttempts += 1;

            if (user.failedLoginAttempts > 3) {
                user.lockUntil = Date.now() + (waitingTime);
            }
            await user.save();
            return res.status(400).json({message: "Email or Password not correct!"});
        }

        if (user.failedLoginAttempts> 0 || user.lockUntil){
            user.failedLoginAttempts = 0;
            user.lockUntil = null;
            await user.save();
        }
        
        // Token Generation
        const accessToken = jwt.sign({id: user._id}, process.env.ATPrivateKey, {expiresIn: "10m"});
        const refreshToken = jwt.sign({id: user._id}, process.env.RTPrivateKey, {expiresIn: "7d"});
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("jwt",refreshToken,{
            httpOnly: true,
            secure: false, // True per HTTPs
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const safeUserData = {
            name: user.name,
            lastName: user.lastName,
            mail: user.mail,
            role: user.role,
            savedEvents: user.savedEvents,
            _id: user._id
        };
        
        res.status(200).json({message: "Successfully logged in!", accessToken: accessToken, userData: safeUserData})
        
    } catch(error){

        res.status(500).json({message: "Server error"})
        console.log(error.message)
    }
};

// GET Refresh Token
const refreshAToken = async (req, res) => {
    try{
        const cookies = req.cookies;
        if (!cookies || !cookies.jwt){ //cookies.jwt is the token
            return res.status(401).json({message: "No Refresh Token found"});
        }

        const refreshToken = cookies.jwt;
            
        const user = await User.findOne({ refreshToken: refreshToken }).populate("savedEvents").select("-refreshToken -password");
        if (!user) {
            return res.status(403).json({ message: "Refresh Token not valid" });
        }

        const decoded = jwt.verify(refreshToken, process.env.RTPrivateKey); // Value or Undefined: contains user's data

        if (user._id.toString() !== decoded.id) {
            return res.status(403).json({ message: "Refresh Token mismatch" });
        }

        const newAccessToken = jwt.sign({id: user._id}, process.env.ATPrivateKey,{expiresIn: "10m"});

        res.status(200).json({ accessToken: newAccessToken, user: user });

    }catch (error){
        res.status(500).json({ message: "Server error" });
        console.log(error.message)
    }
};

const logout = async (req,res)=>{
    try{
        res.clearCookie("jwt",{
            httpOnly: true,
            sameSite: "strict",
            secure: false
        })
        return res.status(200).json({message: "Successful logout"})
    }catch(error){
        res.status(500).json({message: "Server error"})
    }
}

module.exports = {
    login,
    refreshAToken,
    logout
};