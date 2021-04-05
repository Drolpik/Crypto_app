export const EXCHANGE_URL =`https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_KEY}`;
export const CRYPTO_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
