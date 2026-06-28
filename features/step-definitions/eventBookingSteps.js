'use strict';

const { When, Then } = require('@cucumber/cucumber');
const { strict: assert } = require('assert');

const AdminEventsPage  = require('../../pages/AdminEventsPage');
const EventsPage       = require('../../pages/EventsPage');
const BookingFormPage  = require('../../pages/BookingFormPage');
const BookingsPage     = require('../../pages/BookingsPage');
const { futureDateValue, uniqueSuffix } = require('../../utils/dateTimeUtils');
const { readJson } = require('../../utils/fileUtils');
const logger = require('../../utils/logger');

const BASE_URL    = process.env.BASE_URL || 'https://eventhub.rahulshettyacademy.com';
const eventData   = readJson('test-data/eventData.json');
const usersData   = readJson('test-data/users.json');

// ── Admin: Create Event ──────────────────────────────────────────────────────

When('I navigate to the admin events page', async function () {
  const adminPage = new AdminEventsPage(this.page);
  await adminPage.navigate();
});

When('I create a new unique test event', async function () {
  this.eventTitle = `Test Event ${Date.now()}`;
  logger.info(`Creating event: ${this.eventTitle}`);
  const adminPage = new AdminEventsPage(this.page);
  await adminPage.createEvent({
    title:       this.eventTitle,
    description: eventData.newEvent.description,
    city:        eventData.newEvent.city,
    venue:       eventData.newEvent.venue,
    dateValue:   futureDateValue(30),
    price:       eventData.newEvent.price,
    seats:       eventData.newEvent.totalSeats,
  });
});

Then('the event created toast should be visible', async function () {
  const adminPage = new AdminEventsPage(this.page);
  await adminPage.assertEventCreated();
});

// ── Events Listing ───────────────────────────────────────────────────────────

When('I navigate to the events listing page', async function () {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.navigate();
});

When('I navigate back to the events page', async function () {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.navigate();
});

When('I locate the newly created event card', async function () {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.assertFirstCardVisible();
  await eventsPage.assertCardVisible(this.eventTitle, 5000);
});

When('I locate the event card again', async function () {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.assertFirstCardVisible();
  await eventsPage.assertCardVisible(this.eventTitle, 5000);
});

When('I capture the seat count before booking', async function () {
  const eventsPage = new EventsPage(this.page);
  const card = eventsPage.getCardByTitle(this.eventTitle);
  this.seatsBeforeBooking = await eventsPage.getSeatCount(card);
  logger.info(`Seats before booking: ${this.seatsBeforeBooking}`);
});

When('I click Book Now on the event card', async function () {
  const eventsPage = new EventsPage(this.page);
  const card = eventsPage.getCardByTitle(this.eventTitle);
  await eventsPage.clickBookNow(card);
  await this.page.waitForLoadState('networkidle');
});

When('I click Book Now on the first available event card', async function () {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.assertFirstCardVisible();
  const firstAvailableCard = this.page.getByRole('article')
    .filter({ has: this.page.getByRole('link', { name: 'Book Now' }) })
    .filter({ hasNot: this.page.getByText('SOLD OUT') })
    .first();
  await firstAvailableCard.getByRole('link', { name: 'Book Now' }).click();
  await this.page.getByRole('heading', { name: 'Book Tickets' }).waitFor({ state: 'visible', timeout: 15000 });
});

When('I click Book Now on the first available event card with at least {int} seats', async function (minSeats) {
  const eventsPage = new EventsPage(this.page);
  await eventsPage.assertFirstCardVisible();

  const availableCards = this.page.getByRole('article')
    .filter({ has: this.page.getByRole('link', { name: 'Book Now' }) })
    .filter({ hasNot: this.page.getByText('SOLD OUT') });

  const cardCount = await availableCards.count();
  for (let i = 0; i < cardCount; i++) {
    const card = availableCards.nth(i);
    try {
      const seatLocator = card.locator(':text-matches("seat", "i")').first();
      const text = await seatLocator.innerText({ timeout: 2000 });
      const match = text.match(/\d+/);
      if (match) {
        const seats = parseInt(match[0], 10);
        if (seats >= minSeats) {
          logger.info(`Card ${i}: ${seats} seats available (need ${minSeats}), clicking Book Now`);
          await card.getByRole('link', { name: 'Book Now' }).click();
          await this.page.getByRole('heading', { name: 'Book Tickets' }).waitFor({ state: 'visible', timeout: 15000 });
          return;
        }
        logger.info(`Card ${i}: only ${seats} seats available, need ${minSeats} — skipping`);
      }
    } catch (e) {
      logger.info(`Card ${i}: could not read seat count — skipping`);
    }
  }
  throw new Error(`No available event found with at least ${minSeats} seats`);
});

// ── Booking Form ─────────────────────────────────────────────────────────────

Then('the ticket count defaults to 1', async function () {
  const formPage = new BookingFormPage(this.page);
  await formPage.assertDefaultTicketCount('1');
});

When('I increase the ticket quantity by {int}', async function (times) {
  const formPage = new BookingFormPage(this.page);
  await formPage.increaseTicketCount(times);
  logger.info(`Increased ticket count by ${times}`);
});

When('I fill in the booking details', async function () {
  const formPage = new BookingFormPage(this.page);
  await formPage.fillFullName(usersData.primaryUser.name);
  await formPage.fillEmail(usersData.primaryUser.email);
  await formPage.fillPhone('+91 9876543210');
});

When('I confirm the booking', async function () {
  const formPage = new BookingFormPage(this.page);
  await formPage.clickConfirm();
  await this.page.waitForLoadState('networkidle');
});

Then('the booking reference should be visible', async function () {
  const formPage = new BookingFormPage(this.page);
  const bookingRefEl = this.page.locator('.booking-ref').first();
  await bookingRefEl.waitFor({ state: 'visible', timeout: 15000 });
});

When('I store the booking reference', async function () {
  const formPage = new BookingFormPage(this.page);
  this.bookingRef = await formPage.getBookingRef();
  logger.info(`Stored booking ref: ${this.bookingRef}`);
});

When('I click View My Bookings', async function () {
  const formPage = new BookingFormPage(this.page);
  await formPage.clickViewMyBookings();
  await this.page.waitForLoadState('networkidle');
});

// ── Bookings List ─────────────────────────────────────────────────────────────

Then('the URL should be the bookings page', async function () {
  const bookingsPage = new BookingsPage(this.page);
  await bookingsPage.assertUrl(BASE_URL);
});

Then('my booking card with the stored reference should be visible', async function () {
  const bookingsPage = new BookingsPage(this.page);
  await bookingsPage.assertFirstCardVisible();
  await bookingsPage.assertCardContainsRef(this.bookingRef);
});

Then('the booking card should contain the event title', async function () {
  const bookingsPage = new BookingsPage(this.page);
  const card = bookingsPage.getCardByRef(this.bookingRef);
  await bookingsPage.assertCardContainsTitle(card, this.eventTitle);
});

// ── Seat Reduction ────────────────────────────────────────────────────────────

Then('the seat count should be exactly 1 less than before booking', async function () {
  const eventsPage = new EventsPage(this.page);
  const card = eventsPage.getCardByTitle(this.eventTitle);
  this.seatsAfterBooking = await eventsPage.getSeatCount(card);
  logger.info(`Seats after booking: ${this.seatsAfterBooking}`);
  assert.strictEqual(
    this.seatsAfterBooking,
    this.seatsBeforeBooking - 1,
    `Expected seats to drop from ${this.seatsBeforeBooking} to ${this.seatsBeforeBooking - 1}, but got ${this.seatsAfterBooking}`
  );
});
