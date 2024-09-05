const express = require("express");
const router = express.Router();
const User = require("../controllers/auth");
const {isAuthinticated} = require('../middleware/auth');

router.post("/signup", User.signup);
router.post("/signin", User.signin);
router.get("/logout", User.logout);
router.get("/getme", isAuthinticated, User.userProfile);
router.get("/user/:id", User.singleUser);
module.exports = router;
