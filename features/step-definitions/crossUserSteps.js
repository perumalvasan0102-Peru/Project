'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const { apiLogin, getFirstEventId, createBookingViaApi } = require('../../helpers/apiHelper');
const { loginAs } = require('../../helpers/authHelper');
const { USERS } = require('../../test-data/constants');
const logger = require('../../utils/logger');

Given('Yahoo user logs in via API and creates a booking', async function () {
  // Create an isolated API request context
  const apiContext = await request.newContext();
  const token = await apiLogin(apiContext, USERS.YAHOO);
  const eventId = await getFirstEventId(apiContext, token);
  this.yahooBookingId = await createBookingViaApi(apiContext, token, {
    eventId,
    customerName:  'Yahoo User',
    customerEmail: USERS.YAHOO.email,
    customerPhone: '9876543210',
    quantity:      1,
  });
  await apiContext.dispose();
  logger.info(`Yahoo booking created, ID: ${this.yahooBookingId}`);
});

Given('Gmail user logs in via the browser UI', async function () {
  await loginAs(this.page, USERS.GMAIL);
});

When('Gmail user navigates to Yahoo user\'s booking URL', async function () {
  const url = `/bookings/${this.yahooBookingId}`;
  logger.info(`Navigating to Yahoo booking as Gmail user: ${url}`);
  await this.page.goto(url, { waitUntil: 'networkidle' });
});

Then('the page should show {string}', async function (text) {
  const locator = this.page.getByText(text, { exact: false });
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  logger.info(`Page contains expected text: "${text}"`);
});
