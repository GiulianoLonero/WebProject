const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    publications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: null
    }]

});

module.exports = mongoose.model('Artist', artistSchema);    