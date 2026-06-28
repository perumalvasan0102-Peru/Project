'use strict';

const { When, Then } = require('@cucumber/cucumber');
const BookingsPage    = require('../../pages/BookingsPage');
const BookingDetailPage = require('../../pages/BookingDetailPage');
const logger = require('../../utils/logger');

When('I click View Details on the first booking card', async function () {
  const bookingsPage = new BookingsPage(this.page);
  await bookingsPage.assertFirstCardVisible();
  await bookingsPage.clickViewDetails(0);
});

Then('the page should show Booking Information', async function () {
  const detailPage = new BookingDetailPage(this.page);
  await detailPage.assertBookingInfoVisible();
});

Then('the first character of the booking reference should match the first character of the event title', async function () {
  const detailPage = new BookingDetailPage(this.page);
  await detailPage.validateBookingRefVsEventTitle();
});

When('I click Check Refund Eligibility', async function () {
  const detailPage = new BookingDetailPage(this.page);
  await detailPage.clickCheckRefundEligibility();
});

Then('the refund spinner should appear', async function () {
  const detailPage = new BookingDetailPage(this.page);
  await detailPage.assertSpinnerVisible();
});

Then('the refund spinner should disappear within 6 seconds', async function () {
  const detailPage = new BookingDetailPage(this.page);
  await detailPage.assertSpinnerHidden(6000);
});

Then('the refund result should be visible', async function () {
  const detailPage = new BookingDetailPage(this.page);
  await detailPage.assertRefundResultVisible();
});

Then('the refund result should contain {string}', async function (text) {
  const detailPage = new BookingDetailPage(this.page);
  await detailPage.assertRefundResultContains(text);
});
