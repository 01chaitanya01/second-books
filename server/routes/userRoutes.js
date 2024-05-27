const express = require("express");

const {
    registerUser,
    verifyOtp,
    loginUser,
    getAllUsers
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser)

router.post("/registerOtp", verifyOtp)

router.post("/login", loginUser)

router.get("/getAllUsers", getAllUsers)

module.exports = router;