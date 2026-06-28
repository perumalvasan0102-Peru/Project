'use strict';

require('dotenv').config();
const { chromium, firefox, webkit } = require('@playwright/test');
const logger = require('../utils/logger');

let browser = null;

async function getBrowser() {
  if (!browser) {
    const browserType = process.env.BROWSER || 'chromium';
    const headless = process.env.HEADLESS !== 'false';
    logger.info(`Launching browser: ${browserType} (headless=${headless})`);
    const engines = { chromium, firefox, webkit };
    browser = await (engines[browserType] || chromium).launch({
      headless,
      slowMo: parseInt(process.env.SLOW_MO || '0'),
    });
  }
  return browser;
}

async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
    logger.info('Browser closed');
  }
}

module.exports = { getBrowser, closeBrowser };
