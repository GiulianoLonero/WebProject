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
        return res.status(500).json({message: "Server error"});
    };
};

const createEvent = async (req,res)=>{
    try{
        const params = req.body;
        if(!params.title || !params.position || !params.position.name || !params.position.city || !params.position.address ) return res.status(400).json({message:"Missing infos"})

        const newEvent = await Event.create({
            title: params.title,
            date: params.date,
            position: params.position,
            numberOfTickets: params.numberOfTickets,
            artists: params.artists,
            genre: params.genre,
            description: params.description,
            imgurl: params.imgurl
        });

        return res.status(201).json({message:"Successfully created ", event: newEvent});
        
        
    }catch (error){
        res.status(500).json({ message: "Errore interno del server", error: error.message });
    };
};

const deleteEvent = async (req,res)=>{
    try{
        const eventId = req.params.id;
        const foundEvent = await Event.findByIdAndDelete(eventId);
        if(!foundEvent) return res.status(404).json({message:"Event not found"})
        res.status(200).json({message:"Event eliminated", id: eventId})
    } catch (error) {
        res.status(500).json({ message: "Errore interno del server", error: error.message });
    };
}

module.exports = {
    searchEvents,
    allEvents,
    createEvent,
    deleteEvent
}