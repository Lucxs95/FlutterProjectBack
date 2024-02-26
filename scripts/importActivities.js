require('dotenv').config();
const mongoose = require('mongoose');
const Activity = require('../Activity');
const activitiesData = require('./activities.json');

const connectionString = process.env.DB_URI;

async function importActivities() {
    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connecté');
        await Activity.deleteMany({});

        for (const activityData of activitiesData) {
            const activity = new Activity(activityData);
            await activity.save();
        }

        console.log('Toutes les activités importées avec succès');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'importation des activités :', error);
        process.exit(1);
    }
}

importActivities();
