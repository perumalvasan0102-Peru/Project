'use strict';

require('dotenv').config();

const environments = {
  dev: {
    baseUrl: 'https://eventhub.rahulshettyacademy.com',
    apiUrl:  'https://api.eventhub.rahulshettyacademy.com/api',
  },
  staging: {
    baseUrl: 'https://eventhub.rahulshettyacademy.com',
    apiUrl:  'https://api.eventhub.rahulshettyacademy.com/api',
  },
  prod: {
    baseUrl: 'https://eventhub.rahulshettyacademy.com',
    apiUrl:  'https://api.eventhub.rahulshettyacademy.com/api',
  },
};

const env = process.env.TEST_ENV || 'dev';
module.exports = environments[env] || environments.dev;
