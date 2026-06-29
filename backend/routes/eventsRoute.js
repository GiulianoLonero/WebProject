const express = require("express");
const router = express.Router();
const {searchEvents, allEvents, createOrEdit, deleteEvent, saveEvent, deleteSavedEvent} = require("../controllers/eventsController");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.get("/", searchEvents);

router.get("/all-events", allEvents);

router.put("/saved-events", verifyToken, saveEvent);

router.delete("/saved-events", verifyToken, deleteSavedEvent);

//Protected routes
router.post("/", verifyToken, verifyAdmin, createOrEdit);
router.delete("/", verifyToken, verifyAdmin, deleteEvent);
router.put("/", verifyToken, verifyAdmin, createOrEdit);

module.exports = router;