// /src/models/cryptoModel.js
const mongoose = require('mongoose');

// Define Schema
const cryptoSchema = new mongoose.Schema({
    name: String,
    id: String,
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
