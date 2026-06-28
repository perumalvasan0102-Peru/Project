'use strict';

const logger = require('../utils/logger');

class BookingsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.allBookingCards = page.locator('#booking-card');
    this.viewDetailsLinks = page.getByRole('link', { name: 'View Details' });
  }

  async navigate() {
    logger.info('Navigating to bookings page');
    await this.page.goto('/bookings');
    await this.page.waitForLoadState('networkidle');
  }

  async assertUrl(baseUrl) {
    const expected = `${baseUrl}/bookings`;
    await this.page.waitForURL(expected, { timeout: 10000 });
    logger.info(`URL confirmed: ${expected}`);
  }

  async assertFirstCardVisible() {
    await this.allBookingCards.first().waitFor({ state: 'visible', timeout: 15000 });
    logger.info('First booking card is visible');
  }

  /**
   * Returns a booking card that contains an element with class .booking-ref matching refText.
   * @param {string} refText
   * @returns {import('@playwright/test').Locator}
   */
  getCardByRef(refText) {
    return this.allBookingCards.filter({
      has: this.page.locator('.booking-ref', { hasText: refText }),
    });
  }

  async assertCardContainsRef(refText) {
    const card = this.getCardByRef(refText);
    await card.waitFor({ state: 'visible', timeout: 10000 });
    logger.info(`Booking card found for ref: ${refText}`);
    return card;
  }

  async assertCardContainsTitle(card, eventTitle) {
    const text = await card.innerText();
    if (!text.includes(eventTitle))
      throw new Error(`Card does not contain event title "${eventTitle}". Card text: "${text}"`);
    logger.info(`Card contains event title: ${eventTitle}`);
  }

  async clickViewDetails(index = 0) {
    logger.info(`Clicking View Details (index ${index})`);
    await this.viewDetailsLinks.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = BookingsPage;
