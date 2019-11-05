const express = require('express');
const router = express.Router();
const Holiday = require('../models/holiday');

// GET /api/holidays - returns all holidays
router.get('/holidays', (req, res) => {
  Holiday.find({}, (err, holidays) => {
    res.json(holidays);
  });
});

// GET /api/holidays/:id - return Holiday with specified ID
router.get('/holidays/:id', (req, res) => {
  Holiday.findById(req.params.id, (err, holiday) => {
    res.json(holiday);
  });
});

// POST /api/holidays - create a new Holiday
router.post('/holidays', (req, res) => {
  Holiday.create(req.body, (err, holiday) => {
    res.status(201).json(holiday);
  });
});

// PUT /api/holidays/:id - updates the specified Holiday
router.put('/holidays/:id', (req, res) => {
  Holiday.findByIdAndUpdate(req.params.id, req.body, (err, holiday) => {
    res.status(204).json(holiday);
  });
});

// POST /api/holidays/:id/traditions - Adds a new Tradition to this Holiday
router.post('/holidays/:id/traditions', (req, res) => {
  Holiday.findById(req.params.id, (err, holiday) => {
    holiday.traditions.push(req.body);
    holiday.save((err, holiday) => {
      res.status(201).json(holiday);
    });
  });
});

router.delete('/holidays/:hid/traditions/:tid', (req, res) => {
  Holiday.findById(req.params.hid, (err, holiday) => {
    holiday.traditions.id(req.params.tid).remove();
    holiday.save((err, holiday) => {
      res.status(204).json(holiday);
    });
  });
});

module.exports = router;
