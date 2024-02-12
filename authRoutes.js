const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating the user:', error);
        res.status(500).json({ message: 'Error creating the user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) { // Direct string comparison
            return res.status(401).json({ message: 'Authentication failed: user not found or incorrect password.' });
        }

        // Ensure JWT_SECRET is set in your environment variables
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during authentication' });
    }
});

module.exports = router;