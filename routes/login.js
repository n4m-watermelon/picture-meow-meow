const express = require("express");
const router = express.Router();
const user = require("../model/login");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // validation here!
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check email already in db!
  const emailExist = await user.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already");

  //   hash password

  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(req.body.password, salt);

  // create a new user to db!
  const userData = new user({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await userData.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  // validation here!
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check user already in db!
  const userAlready = await user.findOne({ email: req.body.email });
  if (!userAlready) return res.status(400).send("Email is not found");

  //   check password correct !!
  const valiPassword = await bcrypt.compare(req.body.password, userAlready.password);
  if (!valiPassword) return res.status(400).send("Invalid password");

//   res.send("login success");
//     create and assign a token
    const token = jwt.sign({_id:userAlready._id } , process.env.TOKEN_SECRET_KEY)
    res.header('auth-token' , token).send({
      'accessToken' : token
    })

});

module.exports = router;