const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Models
const User = require("../../models/User");

// Matches /api/users


// TO-DO: Move the logic to a 'userController'

// @route POST api/users/register
// @desc Register User
// @access Public
router.post("/register", (req, res) => {

    //console.log(req.body);

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    // Check if a user with this email exists
    User.findOne({ user_email: req.body.user_email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }
        else {
            // If no user found, then create a New User with the req.body
            const newUser = new User({
                user_name: req.body.user_name,
                user_email: req.body.user_email,
                user_pass: req.body.user_pass
            });
            
            //console.log('newUser', newUser);

            // Generate a salt to use to hash password
            bcrypt.genSalt(10, (err, salt) => {
                // Hash password before saving in db
                bcrypt.hash(newUser.user_pass, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.user_pass = hash;

                    // Save the New User
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => res.json(err));
                });
            });
        }     
    });
});

// @route POST api/users/login
// @desc Login User and Return JWT
// @access Public
router.post("/login", (req, res) => {

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.user_email;
    const pass = req.body.user_pass;

    // Find user by email
    User.findOne({ user_email: email })
        .then(user => {
            // Return error if email does not exist in db
            if(!user) {
                return res.status(404).json({emailNotFound: "Email not found!"})
            }
            
            // Check password of the user
            bcrypt.compare(pass, user.user_pass)
            .then(isMatch => {
                // Password Matched!
                if(isMatch) {
                    // Create JWT payload
                    const payload = {
                        id: user.id,
                        user_name: user.user_name
                    }

                    //console.log('payload', payload);
                    
                    // Sign Token and Send it
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 30000000
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer" + token
                            });
                        }
                    );
                }
                else {
                    return res.status(400).json({ passIncorrect: "Password is incorrect! "});
                }
            });
        });
});

module.exports = router;