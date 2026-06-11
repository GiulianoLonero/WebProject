const express = require("express")
const router = express.Router();
const {searchEvents, allEvents, createEvent, deleteEvent, editEvent, saveEvent} = require("../controllers/eventsController")
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

// General routes
router.get("/", searchEvents);

router.get("/all-events", allEvents);

router.put("/", verifyToken, saveEvent);

// Protected routes
router.post("/", verifyToken, verifyAdmin, createEvent);

router.delete("/", verifyToken, verifyAdmin, deleteEvent);

router.put("/", verifyToken, verifyAdmin, editEvent)


module.exports = router