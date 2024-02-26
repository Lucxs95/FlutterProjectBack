const express = require('express');
const router = express.Router();
const User = require('./User');

router.get('/profile/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur' });
    }
});

router.patch('/updateProfile/:userId', async (req, res) => {
    const { userId } = req.params;
    let updates = req.body;

    delete updates.password;

    try {
        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true })
            .select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil utilisateur', error });
    }
});

module.exports = router;
