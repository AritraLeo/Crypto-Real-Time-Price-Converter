// /fetchCryptoData.js
const Crypto = require('./src/models/cryptoModel');
const axios = require('axios');
const mongoose = require('./src/database/mongoose'); // Import the connected mongoose instance

// Fetch and store crypto data
async function fetchAndStoreCryptoData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const cryptoList = response.data;

        // Clear existing data in the collection
        await Crypto.deleteMany({});

        // Insert new data
        await Crypto.insertMany(cryptoList);

        console.log('Crypto data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
}

// Run the script
fetchAndStoreCryptoData();
