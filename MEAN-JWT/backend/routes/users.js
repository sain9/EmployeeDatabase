var express = require("express");
var router = express.Router();
var User = require("../models/user");
let auth = require("../middleware/auth");
var jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({msg:"user alredy exists"});
    }
    user = new User({
      email,
      password,
    });
    let _user = await user.save();
    let userToken = jwt.sign(_user._id.toString(), "hussain");
    return res.status(201).json({token: userToken});
  } catch (err) {
    return res.status(500).json({msg:"server error"});
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log("email", email, "password", password);
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(" user not found");
    }
    if (user.password !== password) {
      return res.status(400).json(" invalid password");
    } else {
      let userToken = await jwt.sign(user._id.toString(), "hussain");
      return res.status(200).json({ token: userToken });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error", err });
  }
});

router.put("/profile", auth, async (req, res) => {
  let { email } = req.body;
  if (!email) {
    return res.status(400).send("please enter email");
  }
  let user = await User.findById(req.id);
  if (!user) {
    return res.status(400).json("user does not exist");
  }
  user.email = email;
  await user.save();
  return res.status(200).send(user.email);
});

router.get("/username", verifyToken, function (req, res, next) {
  return res.status(200).json(decodedToken.username);
});

var decodedToken = "";
function verifyToken(req, res, next) {
  let token = req.query.token;

  jwt.verify(token, "secret", function (err, tokendata) {
    if (err) {
      return res.status(400).json({ message: " Unauthorized request" });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  });
}

module.exports = router;
