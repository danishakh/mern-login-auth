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

// All routes below match /api/users

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
            return res.status(400).json({ error: "Email already exists! Try logging in!" });
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
                        .catch(err => console.log(err));
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
                // This is a security flaw - rather go with 401 Unauthorized
                // return res.status(404).json({emailNotFound: "Email not found!"})
                
                // This is a better approach to overcome the above security threat
                return res.status(401).json({error: "Auth Failed - Incorrect Username/Password!"});
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

                    console.log('payload', payload);
                    
                    // Sign Token and Send it
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 86400        // 1 day
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                message: "Auth Successful!",
                                token: `Bearer ${token}`
                            });
                        }
                    );
                }
                // Password did not match with anything in the db
                else {
                    // Again, security flaw - no need to return too much info - just send 401
                    // return res.status(400).json({ passIncorrect: "Password is incorrect! "});

                    return res.status(401).json({error: "Auth Failed! Incorrect Username/Password!"})
                }
            });
        });
});

module.exports = router;