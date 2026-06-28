'use strict';

const logger = require('../utils/logger');

async function globalTeardown() {
  logger.info('Running global teardown...');
  logger.info('Global teardown complete');
}

module.exports = globalTeardown;
