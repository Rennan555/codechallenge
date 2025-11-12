// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alarmRoutes = require('./routes/alarmRoutes');
const { Server } = require('socket.io') //
const http = require('http') //
const Alarm = require('./models/Alarm') //

// Variáveis
const app = express();
const PORT = 8082;
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

// Middleware
app.use(cors());
app.use(express.json());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/alarm', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error(err);
});

setInterval(async () => {
    const alarms = await Alarm.find()
    io.emit('update', alarms)
}, 5000)

// Rotas
app.use('/alarm', alarmRoutes);

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
