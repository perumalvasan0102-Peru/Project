'use strict';

const logger = require('../utils/logger');

class AdminEventsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addEventBtn     = page.locator('#add-event-btn');
    this.titleInput      = page.locator('#event-title-input');
    this.descriptionInput = page.locator('#admin-event-form textarea');
    this.cityInput       = page.getByLabel('City');
    this.venueInput      = page.getByLabel('Venue');
    this.eventDateInput  = page.getByLabel('Event Date & Time');
    this.priceInput      = page.getByLabel('Price ($)');
    this.totalSeatsInput = page.getByLabel('Total Seats');
    this.submitButton    = page.locator('#add-event-btn');
    this.toastMessage    = page.getByText('Event created!');
    this.eventsTable     = page.locator('table');
  }

  async navigate() {
    logger.info('Navigating to admin events page');
    await this.page.goto('/admin/events');
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddEvent() {
    logger.info('Clicking Add Event button to open form');
    await this.addEventBtn.first().click();
    await this.titleInput.waitFor({ state: 'visible', timeout: 5000 });
  }

  async fillEventTitle(title) {
    logger.info(`Filling event title: ${title}`);
    await this.titleInput.fill(title);
  }

  async fillDescription(description) {
    await this.descriptionInput.fill(description);
  }

  async fillCity(city) {
    await this.cityInput.fill(city);
  }

  async fillVenue(venue) {
    await this.venueInput.fill(venue);
  }

  async fillEventDate(dateValue) {
    logger.info(`Setting event date: ${dateValue}`);
    await this.eventDateInput.fill(dateValue);
  }

  async fillPrice(price) {
    await this.priceInput.fill(String(price));
  }

  async fillTotalSeats(seats) {
    await this.totalSeatsInput.fill(String(seats));
  }

  async submitEvent() {
    logger.info('Submitting new event form');
    await this.submitButton.click();
  }

  async assertEventCreated() {
    await this.toastMessage.waitFor({ state: 'visible', timeout: 10000 });
    logger.info('Event created toast confirmed');
  }

  async createEvent({ title, description, city, venue, dateValue, price, seats }) {
    await this.clickAddEvent();
    await this.fillEventTitle(title);
    await this.fillDescription(description);
    await this.fillCity(city);
    await this.fillVenue(venue);
    await this.fillEventDate(dateValue);
    await this.fillPrice(price);
    await this.fillTotalSeats(seats);
    await this.submitEvent();
    await this.assertEventCreated();
  }
}

module.exports = AdminEventsPage;
