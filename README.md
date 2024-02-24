Certainly! Here's a template for a README file that explains how to set up, run, and deploy your project:

```markdown
# Crypto Real-Time Price Converter

This project is a real-time cryptocurrency price converter with additional features like fetching and updating the list of cryptocurrencies, currency conversion, and retrieving the list of companies holding a particular cryptocurrency.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Tasks](#tasks)
- [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14.0.0 or higher)
- npm (Node Package Manager) installed
- MongoDB installed locally or MongoDB Atlas account for remote database (optional)
- Heroku account (optional for deployment)

## Installation
```
1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/crypto-real-time-price-converter.git
   ```

2. Navigate to the project directory:

   ```bash
   cd crypto-real-time-price-converter
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following contents:

   ```env
   MONGO_CONN_URL=mongodb+srv://<your-username>:<your-password>@crypto-price-converter.nfcbfaw.mongodb.net/crypto
   MONGO_USERNAME=<your-username>
   MONGO_USER_PASSWORD=<your-password>
   ```

   Update `<your-username>` and `<your-password>` with your MongoDB credentials.

## Usage

### Running Locally

1. Start the MongoDB server (if not using MongoDB Atlas):

   ```bash
   mongod
   ```

2. Run the development server:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:3000`.

### Fetching Crypto Data

To fetch the latest list of cryptocurrencies, run:

```bash
node fetchCryptoData.js
```

### Background Task for Crypto List Update

To schedule the background task for updating the crypto list, modify the interval in `index.js`:

```javascript
const cronExpression = '0 * * * *'; // Update every hour
```

### Currency Conversion API

Use the `/api/cryptoConversion/convert` endpoint to convert currencies. Send a POST request with the following JSON payload:

```json
{
  "fromCurrency": "bitcoin",
  "toCurrency": "ethereum",
  "date": "12-01-2023"
}
```

### Public Treasury API

Use the `/api/publicTreasury` endpoint to get the list of companies holding a particular cryptocurrency. Send a POST request with the following JSON payload:

```json
{
  "currency": "bitcoin"
}
```

## Tasks

- [x] Task 1: Fetch and store the list of cryptocurrencies in the database.
- [x] Task 2: Build an API for currency conversion using Coingecko's historical price data.
- [x] Task 3: Integrate Coingecko’s `/companies/public_treasury` API to get the list of companies holding a particular cryptocurrency.


# Crypto-Real-Time-Price-Converter

**Task 1:**

1. Get the names and ids of all cryptocurrencies and store it in a MongoDB database. You can use Coingecko’s APIs to get the list of all cryptocurrencies: https://www.coingecko.com/api/documentation.
2. Write a background job that keeps this list updated every 1 hour.

**Task 2:**

1. Build an API that takes the Coingecko IDs of 2 cryptocurrencies and returns the price of one currency in another on a particular date.
2. Schema of the API:
    1. Request example:
        
        ```jsx
        {
        	“fromCurrency”: “bitcoin”,
        	“toCurrency”: “basic-attention-token”,
        	“date”: “12-01-2023”
        }
        ```
        
3. Response should return the price of Bitcoin in terms of Basic Attention Token(BAT) on 12th January 2023.
4. You can make use of any of the Coingecko APIs from the documentation given above.
5. From and To currencies can be any of the currencies listed on Coingecko.

**Task 3**

1. Integrate Coingecko’s `/companies/public_treasury` API to get the list of companies that hold a particular cryptocurrency.
2. Schema of the API:
    1. Request example:
        
        ```jsx
        {
        	currency: "bitcoin" // Possible values are only bitcoin or ethereum.
        }
        ```
        
3. Response should return the list of companies holding this coin.
