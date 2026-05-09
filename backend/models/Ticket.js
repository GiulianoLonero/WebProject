const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    
    price:{
        type: Number,
        required: true,
        default: 0
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
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    }
});

module.exports = mongoose.model("Ticket",ticketSchema);