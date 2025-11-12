// Imports
const Alarm = require('../models/Alarm');

// Criar novo alarme
exports.createAlarm = async (req, res) => {
    try {
        const alarm = new Alarm(req.body);
        const saved = await alarm.save();
        res.status(201).json(saved);
        console.log("Alarme salvo com sucesso: \n", saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("Erro ao salvar alarme: \n", err);
    }
};

// Listar alarmes
exports.getAlarms = async (req, res) => {
    try {
        const alarms = await Alarm.find();
        res.json(alarms);
        console.log("Alarmes listados com sucesso: \n", alarms);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Erro ao listar alarmes: \n", err);
    }
};
