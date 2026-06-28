'use strict';

require('dotenv').config();
const LoginPage = require('../pages/LoginPage');
const logger = require('../utils/logger');

const DEFAULT_EMAIL    = process.env.USER_EMAIL    || 'perumaltester@gmail.com';
const DEFAULT_PASSWORD = process.env.USER_PASSWORD || 'Tester@123';

/**
 * Logs in with the default credentials and asserts success.
 * @param {import('@playwright/test').Page} page
 */
async function login(page) {
  const loginPage = new LoginPage(page);
  await loginPage.login(DEFAULT_EMAIL, DEFAULT_PASSWORD);
  await loginPage.assertLoginSuccess();
  logger.info(`Logged in as ${DEFAULT_EMAIL}`);
}

/**
 * Logs in as a specific user (used in Setup-4 cross-user tests).
 * @param {import('@playwright/test').Page} page
 * @param {{ email: string, password: string }} user
 */
async function loginAs(page, user) {
  const loginPage = new LoginPage(page);
  await loginPage.login(user.email, user.password);
  await loginPage.assertLoginSuccess();
  logger.info(`Logged in as ${user.email}`);
}

/**
 * Logs in and navigates to /events.
 * @param {import('@playwright/test').Page} page
 */
async function loginAndGoToEvents(page) {
  await login(page);
  await page.goto('/events');
  await page.waitForLoadState('networkidle');
  logger.info('Navigated to /events after login');
}

/**
 * Logs in and navigates to the first available booking detail page.
 * @param {import('@playwright/test').Page} page
 */
async function loginAndGoToBooking(page) {
  await login(page);
  const browseLink = page.getByRole('link', { name: 'Browse Events' });
  await browseLink.waitFor({ state: 'visible', timeout: 10000 });
  logger.info('Login confirmed — Browse Events link visible');
}

module.exports = { login, loginAs, loginAndGoToEvents, loginAndGoToBooking };
