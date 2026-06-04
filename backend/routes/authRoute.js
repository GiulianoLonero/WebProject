const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");


const { login, refreshAToken} = require("../controllers/authController");

router.post("/", loginLimiter, login);

router.get("/refresh", refreshAToken);

module.exports = router;