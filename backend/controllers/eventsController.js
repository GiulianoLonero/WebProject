const Event = require("../models/Event");

const searchEvents = async (req, res)=>{
    try{
        const {genre, location, search } = req.query;
        let filter = {}
        if (genre) filter.genre = genre
        if (location) filter["position.city"] = location
        if (search && search.trim() !== ""){
            filter.title = {$regex: search, $options:"i"}
        }

        const foundEvents = await Event.find(filter)

        if((Object.keys(filter).length) === 0){
            const foundEvents = await Event.find({})
            return res.status(200).json({message: "No filter applied", events: foundEvents})
        }

        return res.status(200).json({message: "Filters applied", events: foundEvents})

    }catch(error){
        return res.status(500).json({message: "Server Error"});
    }
};

const allEvents = async (req, res)=>{
    try{
        const allFoundEvents = await Event.find({})
        return res.status(200).json({message: "All events found", events: allFoundEvents})
    }
    catch(error){
        return res.status(500).json({message: "Server error"})
    }
}

module.exports = {
    searchEvents,
    allEvents
}