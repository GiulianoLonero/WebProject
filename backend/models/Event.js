const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        required: false
    },

    position:{
        name:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        }
    },
    
    numberOfTickets:{
        type: Number,
        default: 0
    },

    artists:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
        default: []
    }],

    genre:{
        type: String,
        required: false,
        default: "Unknown"
    },
    description:{
        type: String,
        required: false
    },
    imgurl:{
        type: String
    }
});

module.exports = mongoose.model('Event', eventSchema);