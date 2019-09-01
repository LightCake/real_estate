const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const db = require("../../db");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "This is the users route" });
});

// User Register
router.post("/register", (request, response) => {
  const { errors, isValid } = validateRegisterInput(request.body);

  if (!isValid) {
    return response.status(400).json(errors);
  }

  const { name, email, password } = request.body;

  // Check to make sure nobody has already registered with the same name or email
  db.query(
    "SELECT * FROM users WHERE name=$1 OR email=$2",
    [name, email],
    (err, res) => {
      if (err) throw err;

      const errors = {};

      for (let obj of res.rows) {
        if (obj.name === name) {
          errors.name = "A user has already registered with this name";
        }
        if (obj.email === email) {
          errors.email = "A user has already registered with this email";
        }
      }
      // Send an 400 error response if the username or email address already exists
      if (Object.keys(errors).length > 0) {
        return response.status(400).json(errors);
      } else {
        // Otherwise create a new user
        // But first hash the password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            db.query(
              "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
              [name, email, hash],
              (err, res) => {
                if (err) throw err;

                if (res) {
                  response.json({ msg: "success" });
                }
              }
            );
          });
        });
      }
    }
  );
});

// User Login
router.post("/login", (request, response) => {
  const { errors, isValid } = validateLoginInput(request.body);

  if (!isValid) {
    return response.status(400).json(errors);
  }

  const { email, password } = request.body;

  // Check to make sure user already registered
  db.query("SELECT * FROM users WHERE email=$1", [email], (err, res) => {
    if (err) throw err;
    // Found an user
    if (res.rows.length > 0) {
      const user = res.rows[0];
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            // Key expires in one hour
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              response.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          return response.status(400).json({ password: "Incorrect password" });
        }
      });
    } else {
      return response.status(400).json({ email: "Email address not found" });
    }
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
