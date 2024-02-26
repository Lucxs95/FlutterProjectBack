const express = require('express');
const router = express.Router();
const Activity = require('./Activity');

router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        console.error('Erreur lors de la récupération des activités:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des activités' });
    }
});

module.exports = router;