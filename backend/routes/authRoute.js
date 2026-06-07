const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");


const { login, refreshAToken, logout} = require("../controllers/authController");

router.post("/", loginLimiter, login);

router.get("/refresh", refreshAToken);

router.post("/logout", logout);

module.exports = router;