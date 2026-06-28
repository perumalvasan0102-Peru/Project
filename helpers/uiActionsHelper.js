'use strict';

const logger = require('../utils/logger');

async function clickAndWait(page, locator) {
  await locator.click();
  await page.waitForLoadState('networkidle');
}

async function fillAndTab(locator, value) {
  await locator.fill(value);
  await locator.press('Tab');
}

async function scrollToElement(locator) {
  await locator.scrollIntoViewIfNeeded();
}

async function getText(locator) {
  const text = (await locator.innerText()).trim();
  logger.info(`Read text: "${text}"`);
  return text;
}

async function getAttribute(locator, attr) {
  return locator.getAttribute(attr);
}

async function isVisible(locator) {
  return locator.isVisible();
}

module.exports = { clickAndWait, fillAndTab, scrollToElement, getText, getAttribute, isVisible };
