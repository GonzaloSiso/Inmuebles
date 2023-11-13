const express = require('express');
const router = express.Router();
const Inmueble = require('../models/inmueble');

//GET
router.get('/', async (req, res) => {
  try {
    const inmuebles = await Inmueble.find();
    res.json(inmuebles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST
router.post('/', async (req, res) => {
  const inmueble = new Inmueble(req.body);
  try {
    const nuevoInmueble = await inmueble.save();
    res.status(201).json(nuevoInmueble);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.mailContacto) {
      res.status(400).json({ message: 'El correo ya está registrado, sólo puede registrarse un inmueble por cada correo.' });
    } else {
      // Otro tipo de error
      res.status(400).json({ message: error.message });
    }
  }
});

//UPDATE
router.patch('/:id', async (req, res) => {
    try {
      const inmueble = await Inmueble.findById(req.params.id);
  
      if (inmueble) {
        Object.assign(inmueble, req.body);
        const inmuebleActualizado = await inmueble.save();
  
        res.json(inmuebleActualizado);
      } else {
        res.status(404).json({ message: 'Inmueble no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

//DELETE
router.delete('/:id', async (req, res) => {
    try {
      const inmueble = await Inmueble.findById(req.params.id);
  
      if (inmueble) {
        await inmueble.deleteOne();
        res.json({ message: 'Inmueble eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Inmueble no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
