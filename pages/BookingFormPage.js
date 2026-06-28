'use strict';

const logger = require('../utils/logger');

class BookingFormPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.ticketCount      = page.locator('#ticket-count');
    // Use filter to avoid strict-mode issues if multiple buttons have "+" text
    this.incrementBtn     = page.locator('button').filter({ hasText: '+' });
    this.decrementBtn     = page.locator('button').filter({ hasText: '−' });
    this.fullNameInput    = page.getByLabel('Full Name');
    this.emailInput       = page.locator('#customer-email');
    this.phoneInput       = page.getByPlaceholder('+91 98765 43210');
    this.confirmBtn       = page.locator('.confirm-booking-btn');
    // .booking-ref class exists on the confirmation view and booking list cards
    this.bookingRefEl     = page.locator('.booking-ref').first();
    this.viewBookingsLink = page.getByRole('link', { name: 'View My Bookings' });
  }

  async assertDefaultTicketCount(expected = '1') {
    const text = await this.ticketCount.innerText();
    if (text.trim() !== expected)
      throw new Error(`Expected ticket count "${expected}" but got "${text.trim()}"`);
    logger.info(`Ticket count is ${expected}`);
  }

  async increaseTicketCount(times = 1) {
    await this.incrementBtn.scrollIntoViewIfNeeded();
    await this.incrementBtn.waitFor({ state: 'visible', timeout: 15000 });
    for (let i = 0; i < times; i++) {
      await this.incrementBtn.click();
      logger.info(`Clicked increment, pass ${i + 1}`);
    }
  }

  async fillFullName(name) {
    await this.fullNameInput.fill(name);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPhone(phone) {
    await this.phoneInput.fill(phone);
  }

  async clickConfirm() {
    logger.info('Clicking Confirm Booking button');
    await this.confirmBtn.click();
  }

  async fillAndConfirm({ name, email, phone }) {
    await this.fillFullName(name);
    await this.fillEmail(email);
    await this.fillPhone(phone);
    await this.clickConfirm();
  }

  async getBookingRef() {
    await this.bookingRefEl.waitFor({ state: 'visible', timeout: 15000 });
    const ref = (await this.bookingRefEl.innerText()).trim();
    logger.info(`Booking reference: ${ref}`);
    return ref;
  }

  async clickViewMyBookings() {
    logger.info('Clicking View My Bookings');
    await this.viewBookingsLink.click();
  }
}

module.exports = BookingFormPage;
