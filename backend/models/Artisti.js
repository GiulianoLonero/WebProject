const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    IDArtist:{
        type: String,
        required: true,
        unique: true
    },

    publications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }]

});

module.exports = mongoose.model('Artist', artistSchema);    