const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    
    price:{
        type: Number,
        required: true
    },

    status:{
        type: String,
        enum: ["avaiable","locked","purchased"],
        default: "avaiable"
    },

    IDTicket:{
        type: String,
        required: true
    },

    IDEvent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    lockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    lockedUntil: {
        type: Date,
        default: null
    
    }
});

module.exports = mongoose.model("Ticket",ticketSchema);