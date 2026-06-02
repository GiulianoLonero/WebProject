const express = require("express");
const router = express.Router();

const loginLimiter = require("../middleware/loginLimiter")

const { login, refreshToken} = require("../controllers/authController")

router.post("/", loginLimiter, login);

router.get("/refresh", refreshToken);

module.exports = router;