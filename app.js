const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/inmuebles');

const express = require('express');
const app = express();
const inmueblesRouter = require('./routes/inmuebles');

app.use(express.json());
app.use('/api/inmuebles', inmueblesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
