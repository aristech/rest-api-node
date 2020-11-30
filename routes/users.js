const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const superAdmin = require("../middleware/superAdmin");
const userAuth = require("../middleware/userAuth");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", [auth, superAdmin], async (req, res) => {
  const users = await User.find().select(["-password", "-__v"]);
  res.send(users);
});

router.get("/me", [auth, userAuth], async (req, res) => {
  const user = await User.findById(req.user._id).select(["-password", "-__v"]);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({ message: "User already registered." });
  const { name, email, password, role } = req.body;
  user = new User({ name, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "role"]));
});

module.exports = router;
