const express = require("express")
const router = express.Router();
const searchEvents = require("../controllers/eventsController")

router.get("/", searchEvents);

module.exports = router