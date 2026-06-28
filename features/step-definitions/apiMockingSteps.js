'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const EventsPage = require('../../pages/EventsPage');
const { loginAndGoToEvents } = require('../../helpers/authHelper');
const { SIX_EVENTS_RESPONSE } = require('../../test-data/constants');
const logger = require('../../utils/logger');

// Step 1 — register the route interceptor BEFORE any navigation
Given('the events API is mocked to return 6 events', async function () {
  logger.info('Setting up API mock for /api/events → 6 events');
  await this.page.route('**/api/events**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(SIX_EVENTS_RESPONSE),
    });
  });
});

// Step 2 — login then navigate to /events in one call (mock already active)
When('I login and navigate to the events page', async function () {
  await loginAndGoToEvents(this.page);
});

Then('there should be exactly {int} event cards displayed', async function (count) {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.assertFirstCardVisible();
  await eventsPage.assertCardCount(count);
});

Then('the sandbox banner should be visible', async function () {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.assertBannerVisible();
});

Then('the banner should contain {string}', async function (text) {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.assertBannerContains(text);
});
