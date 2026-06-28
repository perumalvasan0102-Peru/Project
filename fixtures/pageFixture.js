'use strict';

require('dotenv').config();
const { getBrowser } = require('./browserFixture');
const logger = require('../utils/logger');

class PageFixture {
  constructor() {
    this.browser  = null;
    this.context  = null;
    this.page     = null;
  }

  async init() {
    this.browser = await getBrowser();
    this.context = await this.browser.newContext({
      baseURL: process.env.BASE_URL || 'https://eventhub.rahulshettyacademy.com',
      recordVideo: { dir: 'videos/' },
      viewport: { width: 1280, height: 720 },
    });
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(parseInt(process.env.DEFAULT_TIMEOUT || '30000'));
    this.page.setDefaultNavigationTimeout(parseInt(process.env.NAVIGATION_TIMEOUT || '60000'));
    logger.info('Page fixture initialized');
    return this.page;
  }

  async teardown() {
    if (this.context) {
      await this.context.close();
      this.context = null;
    }
    logger.info('Page fixture torn down');
  }
}

module.exports = PageFixture;
