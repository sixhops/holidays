const mongoose = require('mongoose');

const traditionSchema = new mongoose.Schema({
  name: String,
  description: String
}, {
  timestamps: true
});

const holidaySchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  name: String,
  description: String,
  traditions: [traditionSchema]
});

module.exports = mongoose.model('Holiday', holidaySchema);
