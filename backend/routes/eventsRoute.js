const express = require("express")
const router = express.Router();
const {searchEvents, allEvents, createEvent, deleteEvent} = require("../controllers/eventsController")
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

// General routes
router.get("/", searchEvents);

router.get("/all-events", allEvents);

// Protected routes
router.post("/", verifyToken, verifyAdmin, createEvent);

router.delete("/", verifyToken, verifyAdmin, deleteEvent);

module.exports = router