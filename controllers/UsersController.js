const express = require('express');
const router = express.Router();
const db = require('../utils/db');
var sha1 = require('sha1');


    router.post('/users', async (req, res) => {
    const { password } = req.body;
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Missing password' });
    }
    const emailfind = await db.findOne({ email });

    if (emailfind) {
        return res.status(400).json({ error: 'Already exist' });
    }
    const hashedpassword = sha1(password);

    const newUser = new User({
        email,
        password: hashedpassword,
      });

    await newUser.save();
    return res.status(201).json({ email: newUser.email, id: newUser._id });
})