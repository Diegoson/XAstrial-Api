const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email, phoneNumber } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const isVIP = (email === 'amdablack63@gmail.com' && phoneNumber === '+27686881509');

let apiKey;
  if (isVIP) {
     apiKey = 'Diegoson';
  } else {
     apiKey = generateRandomApiKey();
  }

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    phoneNumber,
    apiKey,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', apiKey });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

  const generateRandomApiKey = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = '';
  for (let i = 0; i < 6; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return apiKey;
};

module.exports = router;
