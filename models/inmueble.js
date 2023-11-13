const mongoose = require('mongoose');

const inmuebleSchema = new mongoose.Schema({
  piso: String,
  letra: String,
  extension: Number,
  numHabitaciones: Number,
  alquilado: Boolean,
  nombrePropietario: String,
  mailContacto: { type: String, unique: true, required: true }
});

const Inmueble = mongoose.model('Inmueble', inmuebleSchema);

module.exports = Inmueble;
