// routes/services.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { v4: uuidv4 } = require('uuid'); // Correct import for v4

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/services
// @desc    Create a new service
// @access  Public
router.post('/', async (req, res) => {
  const { title, price } = req.body;
  const id = uuidv4(); // Use v4() to generate UUID
  try {
    const newService = new Service({
      title,
      price,
      id,
    });

    const service = await newService.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({ id: req.params.id });

    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service by ID
// @access  Public
router.put('/:id', async (req, res) => {
  const { title, price } = req.body;

  const serviceFields = {};
  if (title) serviceFields.title = title;
  if (price) serviceFields.price = price;

  try {
    let service = await Service.findOne({ id: req.params.id });

    if (!service) return res.status(404).json({ msg: 'Service not found' });

    service = await Service.findOneAndUpdate(
      { id: req.params.id },
      { $set: serviceFields },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({ id: req.params.id });

    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    await service.remove();
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
