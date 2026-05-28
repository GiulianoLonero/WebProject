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

    shoppingList:[{
        type: mongoose.Schema.ObjectId,
        ref: "Ticket"
    }],

    ticketList:[{
        type: mongoose.Schema.ObjectId,
        ref: "Ticket"
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
    }
});

module.exports = mongoose.model("User",userSchema);