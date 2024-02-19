const express = require('express');
const router = express.Router();
const User = require('./User'); // Assuming the model is in a 'models' directory

// Endpoint pour récupérer le profil de l'utilisateur avec userId dans l'URL
router.get('/profile/:userId', async (req, res) => {
    const { userId } = req.params; // Extrayez l'userId de l'URL

    try {
        const user = await User.findById(userId); // Utilisez l'userId pour trouver l'utilisateur
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

router.patch('/updateProfile/:userId', async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error });
    }
});

module.exports = router;
