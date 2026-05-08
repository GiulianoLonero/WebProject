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

    IDUser:{
        type: String,
        required: true,
        unique: true
    }

});

module.exports = mongoose.model("User",userSchema);