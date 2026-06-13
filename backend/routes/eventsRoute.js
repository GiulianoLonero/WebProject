const express = require("express")
const router = express.Router();
const {searchEvents, allEvents, createEvent, deleteEvent, editEvent, saveEvent, deleteSavedEvent} = require("../controllers/eventsController")
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

// General routes
router.get("/", searchEvents);

router.get("/all-events", allEvents);


// Protected routes
router.put("/saved-events", verifyToken, saveEvent);

router.delete("/saved-events", verifyToken, deleteSavedEvent);

router.post("/", verifyToken, verifyAdmin, createEvent);

router.delete("/", verifyToken, verifyAdmin, deleteEvent);

router.put("/", verifyToken, verifyAdmin, editEvent)


module.exports = router