'use strict';

require('dotenv').config();
const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { captureScreenshotOnFailure } = require('../../utils/screenshotUtils');
const logger = require('../../utils/logger');

setDefaultTimeout(parseInt(process.env.DEFAULT_TIMEOUT || '60000'));

let sharedBrowser = null;

BeforeAll(async function () {
  logger.info('=== Test Suite Starting ===');
  const headless = process.env.HEADLESS !== 'false';
  sharedBrowser = await chromium.launch({
    headless,
    slowMo: parseInt(process.env.SLOW_MO || '0'),
  });
  logger.info(`Browser launched (headless=${headless})`);
});

AfterAll(async function () {
  if (sharedBrowser) {
    await sharedBrowser.close();
    sharedBrowser = null;
    logger.info('Browser closed');
  }
  logger.info('=== Test Suite Finished ===');
});

Before(async function (scenario) {
  logger.info(`--- Starting scenario: "${scenario.pickle.name}" ---`);
  this.context = await sharedBrowser.newContext({
    baseURL: process.env.BASE_URL || 'https://eventhub.rahulshettyacademy.com',
    recordVideo: { dir: 'videos/' },
    viewport: { width: 1280, height: 720 },
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(parseInt(process.env.DEFAULT_TIMEOUT || '30000'));
  this.page.setDefaultNavigationTimeout(parseInt(process.env.NAVIGATION_TIMEOUT || '60000'));
});

After(async function (scenario) {
  const scenarioName = scenario.pickle.name;
  if (scenario.result?.status === Status.FAILED) {
    logger.error(`FAILED: "${scenarioName}"`);
    try {
      const screenshotPath = await captureScreenshotOnFailure(this.page, scenarioName);
      const img = require('fs').readFileSync(screenshotPath);
      await this.attach(img, 'image/png');
      logger.info(`Screenshot attached for: "${scenarioName}"`);
    } catch (e) {
      logger.warn(`Could not capture screenshot: ${e.message}`);
    }
  }
  if (this.context) {
    await this.context.close();
    this.context = null;
    this.page    = null;
  }
  logger.info(`--- Finished scenario: "${scenarioName}" (${scenario.result?.status}) ---`);
});
