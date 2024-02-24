const axios = require('axios');
const Crypto = require('../models/cryptoModel');

// Fetch and update crypto data in the database
async function updateCryptoList() {
  try {
    console.log('Fetching crypto list from Coingecko API...');
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const cryptoList = response.data;

    console.log(`Received crypto list with ${cryptoList.length} cryptocurrencies.`);

    // Could have updated but then I'd have to map it with id
    // Clear existing data in the collection
    await Crypto.deleteMany({});
    console.log('Cleared existing data in the collection.');

    // Insert new data
    await Crypto.insertMany(cryptoList);
    console.log(`Crypto list updated successfully. ${cryptoList.length} cryptocurrencies added.`);
  } catch (error) {
    console.error('Error updating crypto list:', error.message);
  }
}

module.exports = updateCryptoList;
