// Supposons que ce code se trouve dans un fichier de routes, par exemple userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('./User'); // Importez le modèle User

// Endpoint pour récupérer le profil de l'utilisateur
router.get('/profile', async (req, res) => {
    // Extrayez l'userId à partir du JWT ou passez l'userId en tant que paramètre
    const { userId } = req; // Cet exemple suppose que vous avez déjà extrait userId du JWT

    try {
        const user = await User.findById(userId, '-password'); // Exclure le mot de passe de la réponse
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

module.exports = router;
