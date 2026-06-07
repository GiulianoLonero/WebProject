const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { verify, register} = require("../controllers/usersController")

router.get("/verify", verifyToken, verify);

router.post("/register", register);

module.exports = router;
