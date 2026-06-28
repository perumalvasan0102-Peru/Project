'use strict';

const path = require('path');
const fs = require('fs');
const logger = require('./logger');

const screenshotDir = process.env.SCREENSHOT_DIR || 'screenshots';

async function captureScreenshot(page, name = 'screenshot') {
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name}-${timestamp}.png`;
  const filePath = path.join(screenshotDir, filename);
  await page.screenshot({ path: filePath, fullPage: true });
  logger.info(`Screenshot saved: ${filePath}`);
  return filePath;
}

async function captureScreenshotOnFailure(page, scenarioName) {
  const safeName = scenarioName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return captureScreenshot(page, `FAILED_${safeName}`);
}

module.exports = { captureScreenshot, captureScreenshotOnFailure };
