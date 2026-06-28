'use strict';

require('dotenv').config();
const logger = require('../utils/logger');
const { ensureDir } = require('../utils/fileUtils');

async function globalSetup() {
  logger.info('Running global setup...');
  ['reports', 'reports/cucumber-html', 'reports/playwright-html',
   'screenshots', 'videos', 'traces', 'logs', 'allure-results'].forEach(ensureDir);
  logger.info('Output directories created');
}

module.exports = globalSetup;
