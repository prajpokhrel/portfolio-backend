const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

// cookie expects time in milliseconds
const maxAge = 3 * 24 * 60 * 60;

router.post('/', async (req, res) => {

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid Email or password..');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) res.status(400).send('Invalid Email or Password...');

    const token = user.generateAuthToken();
    res.cookie('portfolioJWT', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ userID: user._id });

});


module.exports = router;