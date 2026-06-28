'use strict';

require('dotenv').config();

function getEnv(key, defaultValue) {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Environment variable "${key}" is not set`);
  }
  return value;
}

function getBaseUrl() { return getEnv('BASE_URL', 'https://eventhub.rahulshettyacademy.com'); }
function getApiUrl()  { return getEnv('API_URL',  'https://api.eventhub.rahulshettyacademy.com/api'); }

module.exports = { getEnv, getBaseUrl, getApiUrl };
