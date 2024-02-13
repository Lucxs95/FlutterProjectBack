// Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    minPeople: { type: Number, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Activity', activitySchema);
