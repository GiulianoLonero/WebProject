const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    mail:{
        type: String,
        required: true,
        unique: true
    },

    savedEvents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required:false,
        default:[]
    }],

    failedLoginAttempts:{
        type: Number,
        required: true,
        default: 0
    },

    lockUntil:{
        type: Date
    },
    
    refreshToken:{
        type: String
    },

    role:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
});

module.exports = mongoose.model("User",userSchema);