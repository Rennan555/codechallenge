// Imports
const mongoose = require('mongoose');

// Schema do alarme
const alarmSchema = new mongoose.Schema({
    serial: { type: String, required: true },
    type: { type: Number, required: true },
    checked: { type: Boolean, required: true },
    deviceType: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Export do modelo
module.exports = mongoose.model('Alarm', alarmSchema);
