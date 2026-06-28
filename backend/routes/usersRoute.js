const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { verify, register, getUser, editUser } = require("../controllers/usersController");

router.get("/verify", verifyToken, verify);

router.post("/register", register);

router.get("/:id", getUser);

router.put("/edit", verifyToken, editUser);

module.exports = router;