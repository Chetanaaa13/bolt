const express = require("express");
const router = express.Router();
const User = require("../models/User"); // make sure the path is correct

// POST /users
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
