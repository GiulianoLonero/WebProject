const express = require("express")
const router = express.Router();
const {searchEvents, allEvents} = require("../controllers/eventsController")

router.get("/", searchEvents);

router.get("/all-events", allEvents);

module.exports = router