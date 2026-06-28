'use strict';

const { Given } = require('@cucumber/cucumber');
const { login } = require('../../helpers/authHelper');
const logger = require('../../utils/logger');

Given('I am logged in to EventHub', async function () {
  logger.info('Step: I am logged in to EventHub');
  await login(this.page);
});
