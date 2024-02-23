# Crypto-Real-Time-Price-Converter
KoinX - Backend - Price Conversion Task. 

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
