const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect('mongodb://localhost/holidays');
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

app.use('/api', require('./routes/api'));

app.listen(3001, () => {
  console.log("Express listening on port 3001...");
});
