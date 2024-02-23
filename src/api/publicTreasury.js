// /src/api/publicTreasury.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { currency } = req.body;

        // Validate the input
        if (currency.toLowerCase() !== 'bitcoin' && currency.toLowerCase() !== 'ethereum') {
            throw new Error('Invalid currency. Possible values are only bitcoin or ethereum.');
        }

        // Fetch list of companies holding the specified coin
        const companies = await getPublicTreasury(currency.toLowerCase());

        res.json({ companies });
    } catch (error) {
        console.error('Error fetching public treasury data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to fetch public treasury data from Coingecko
async function getPublicTreasury(currency) {
    const response = await axios.get(
        `https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`
    );

    const companies = response.data.companies.map(company => company.name);
    console.log(companies);
    return companies;
}

module.exports = router;
