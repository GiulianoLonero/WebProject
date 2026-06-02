const express = require("express");
const router = express.Router();

router.use("/api/v1/users", require("./routes/usersRoute"));
router.use("/api/v1/auth", require("./routes/authRoute"));
router.use("/api/v1/events", require("./routes/eventsRoute"));

module.exports = router;