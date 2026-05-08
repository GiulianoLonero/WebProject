const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    totalPrize:{
        type: Number,
        required: true
    },

    ticketlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }],

    IDUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    IDOrder:{
        type: String,
        required: true,
        unique: true
    }
    
})