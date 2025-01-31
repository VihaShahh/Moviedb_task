const express = require("express");
const { check } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

//register route
router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Include a valid email").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 })
    ],
    registerUser
);

//login route
router.post(
    "/login",
    [
        check("email", "Include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    loginUser
);

module.exports = router;
