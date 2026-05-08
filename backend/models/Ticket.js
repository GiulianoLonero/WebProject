const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    
    price:{
        type: Number,
        required: true
    },

    status:{
        type: String,
        enum: ["available","locked","purchased"],
        default: "available"
    },

    IDTicket:{
        type: String,
        required: true,
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