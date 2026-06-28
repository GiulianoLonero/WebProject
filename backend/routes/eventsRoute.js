const express = require("express");
const router = express.Router();
const {searchEvents, allEvents, createEvent, deleteEvent, editEvent, saveEvent, deleteSavedEvent} = require("../controllers/eventsController");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.get("/", searchEvents);

router.get("/all-events", allEvents);

router.put("/saved-events", verifyToken, saveEvent);

router.delete("/saved-events", verifyToken, deleteSavedEvent);

//Protected routes
router.post("/", verifyToken, verifyAdmin, createEvent);
router.delete("/", verifyToken, verifyAdmin, deleteEvent);
router.put("/", verifyToken, verifyAdmin, editEvent);

module.exports = router;