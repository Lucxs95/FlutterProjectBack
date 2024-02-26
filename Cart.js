const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
});

module.exports = mongoose.model('Cart', cartSchema);
