// Require dependencies
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Bring in User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: "Users Works"});
});

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                // Throw 400 error if user already exists
                return res.status(400).json({email: 'Email already exists'});
            } else {
                // Init gravatar
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', // rating
                    d: 'mm' // default
                });
                // Create new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                // Generate salt and hash the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err; 
                        newUser.password  = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
