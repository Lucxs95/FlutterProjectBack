// activityRoutes.js
const express = require('express');
const router = express.Router();
const Activity = require('./Activity'); // Importez le modèle d'activité

// Route pour récupérer toutes les activités
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find(); // Récupérer toutes les activités
        res.json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Error fetching activities' });
    }
});

module.exports = router;
