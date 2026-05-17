const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../models/User");
require("dotenv").config();
const rateLimit = require("express-rate-limit")

const waitingTIme = 5*60*1000

const loginLimiter = rateLimit({
    windowMs: waitingTime,
    max: 3,
    message: {
        message: "Too many trials, try again in 5 minutes"
    },
    standardHeaders: true //forse da togliere
});

router.post("/", loginLimiter, async(req,res) => {
    try{
        const {mail, password} = req.body;

        // Per evitare qualsiasi NoSQL Injection
        if (typeof(mail) !== "string" || typeof(password) !== "string")
            return res.status(400).json({message: "Invalid input type"})

        // Controllo sull'utente
        const user = await User.findOne({mail: mail});
        
        if (!user){
            return res.status(400).json({message: "Email or Password not correct!"});
        }

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
        
        // Generazione dei token
        const accessToken = jwt.sign({id: user._id}, process.env.ATPrivateKey, {expiresIn: "1h"});
        const refreshToken = jwt.sign({id: user._id}, process.env.RTPrivateKey, {expiresIn: "7d"});
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("jwt",refreshToken,{
            httpOnly: true,
            secure: false, // True per HTTPs
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({message: "Successfully logged in!", accessToken: accessToken})
        
    } catch(error){

        res.status(500).json({message: "Server error"})
        console.log(error.message)
    }
});

router.get("/refresh", async (req, res) => {
    try{
        const cookies = req.cookies;
        if (!cookies || !cookies.jwt){
            return res.status(401).json({message: "No Refresh Token found"});
        }

        const refreshToken = cookies.jwt;
            
        const user = await User.findOne({ refreshToken: refreshToken });
        if (!user) {
            return res.status(403).json({ message: "Refresh Token not valid" });
        }

        jwt.verify(refreshToken, process.env.RTPrivateKey, (err,decoded) => {
            if (err || user._id.toString() !== decoded.id){
                return res.status(403).json({ message: "Refresh Token expired"}); 
            }

            const newAccessToken = jwt.sign({id = user._id}, process.env.ATPrivateKey,{expiresIn: "1h"});

            res.status(200).json({ accessToken: newAccessToken });
        });
    }catch (error){
        res.status(500).json({ message: "Server error" });
        console.log(error.message)
    }
});

module.exports = router;