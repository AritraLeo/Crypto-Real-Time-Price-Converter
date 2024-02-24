const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_CONN_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_USER_PASSWORD}@crypto-price-converter.nfcbfaw.mongodb.net/crypto`;

// MongoDB connection
mongoose.connect(MONGO_CONN_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
