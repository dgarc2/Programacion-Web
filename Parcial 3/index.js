const express = require('express');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
// const eventRoutes = require('./routes/reservaRoutes');
// const reservaRoutes = require('./routes/reservaRoutes');
//const db = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/eventos', eventRoutes);
//app.use('/api/reservas', reservaRoutes');

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});