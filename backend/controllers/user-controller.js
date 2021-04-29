const User = require("../db/models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validations/registration");
const validateLoginInput = require("../validations/login");
const dotenv = require('dotenv');
dotenv.config();

const createUser = async (req, res) => {
  
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email_address: req.body.email_address });
  if (user) {
    return res
      .status(400)
      .json({ success: false, error: "Email already exists" });
  } else {
    const newUser = new User(req.body);
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.date_joined = new Date();
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  }
};

const getUserByMail = async (req, res) => {
  try {
    const user = await User.findOne({ email_address: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const tokenSecret = process.env.TOKEN_SECRET
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email_address, password } = req.body;

  // Find user by email
  User.findOne({ email_address }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload

        User.updateOne({email_address: user.email_addres}, {last_login: new Date()} )

        const payload = {
          _id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email_address: user.email_address,
          staff_status: user.staff_status,
          active: user.active,
          accounttype: user.accounttype,
        };

        // Sign token
        jwt.sign(
          payload,
          tokenSecret,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              data: payload,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

module.exports = {
  createUser,
  getUserByMail,
  loginUser,
};