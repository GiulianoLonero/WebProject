const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    totalPrice:{
        type: Number,
        required: true
    },

    ticketlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    }],

    IDUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderData:{
        type: Date,
        required: true
    },
    
    paymentStatus:{
        type: String,
        enum: ["completed", "pending", "cancelled"],
        required: true
    }
});
module.exports = mongoose.model("Order",orderSchema);