const Event = require("../models/Event");

const searchEvents = async (req, res)=>{
    try{
        const {genre, location, searchBar } = req.query;
        let filter = {}
        if (genre) filter.genre = genre
        if (location) filter["position.city"] = location
        if (searchBar && searchBar.trim() !== ""){
            filter.$or = [
                { title: {$regex: searchBar, $options:"i"}},
                { artists: {$regex: searchBar, $options:"i"}}
            ]
        }

        const foundEvents = await Event.find(filter)

        if((Object.keys(filter).length) === 0){
            return res.status(200).json({message: "No filter applied"})
        }

        res.status(200).json(foundEvents)

    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

module.exports = searchEvents