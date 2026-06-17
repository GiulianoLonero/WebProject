const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { verify, register, getUser } = require("../controllers/usersController")

router.get("/verify", verifyToken, verify);

router.post("/register", register);

router.get("/", getUser);

module.exports = router;
