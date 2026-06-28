'use strict';

const logger = require('./logger');

/**
 * Waits for a locator to be visible.
 * @param {import('@playwright/test').Locator} locator
 * @param {number} timeout
 */
async function waitForVisible(locator, timeout = 10000) {
  await locator.waitFor({ state: 'visible', timeout });
}

/**
 * Waits for a locator to be hidden/detached.
 * @param {import('@playwright/test').Locator} locator
 * @param {number} timeout
 */
async function waitForHidden(locator, timeout = 10000) {
  await locator.waitFor({ state: 'hidden', timeout });
}

/**
 * Waits for network to be idle after an action.
 * @param {import('@playwright/test').Page} page
 */
async function waitForNetworkIdle(page, timeout = 30000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Polls until a condition function returns true.
 * @param {Function} conditionFn - async function returning boolean
 * @param {number} intervalMs
 * @param {number} timeoutMs
 */
async function pollUntil(conditionFn, intervalMs = 500, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await conditionFn()) return true;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Condition not met within ${timeoutMs}ms`);
}

/**
 * Waits for a URL pattern.
 * @param {import('@playwright/test').Page} page
 * @param {string|RegExp} urlPattern
 * @param {number} timeout
 */
async function waitForUrl(page, urlPattern, timeout = 15000) {
  await page.waitForURL(urlPattern, { timeout });
  logger.info(`URL matched: ${urlPattern}`);
}

module.exports = { waitForVisible, waitForHidden, waitForNetworkIdle, pollUntil, waitForUrl };
