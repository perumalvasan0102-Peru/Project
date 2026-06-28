'use strict';

const logger = require('../utils/logger');

class EventsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.allEventCards = page.getByTestId('event-card');
    this.searchInput   = page.getByPlaceholder('Search events, venues…');
    this.sandboxBanner = page.getByText(/sandbox holds up to/i);
  }

  async navigate() {
    logger.info('Navigating to events page');
    await this.page.goto('/events');
    await this.page.waitForLoadState('networkidle');
  }

  async assertFirstCardVisible() {
    await this.allEventCards.first().waitFor({ state: 'visible', timeout: 15000 });
    logger.info('First event card is visible');
  }

  /**
   * Finds a card containing the given event title text.
   * @param {string} eventTitle
   * @returns {import('@playwright/test').Locator}
   */
  getCardByTitle(eventTitle) {
    return this.allEventCards.filter({ hasText: eventTitle });
  }

  async assertCardVisible(eventTitle, timeout = 5000) {
    const card = this.getCardByTitle(eventTitle);
    await card.waitFor({ state: 'visible', timeout });
    logger.info(`Event card visible: "${eventTitle}"`);
    return card;
  }

  /**
   * Reads the available seat count from a specific event card.
   * @param {import('@playwright/test').Locator} card
   * @returns {Promise<number>}
   */
  async getSeatCount(card) {
    const seatLocator = card.locator(':text-matches("seat", "i")').first();
    const text = await seatLocator.innerText();
    const match = text.match(/\d+/);
    if (!match) throw new Error(`Could not parse seat count from: "${text}"`);
    const count = parseInt(match[0], 10);
    logger.info(`Seat count read: ${count} (from "${text}")`);
    return count;
  }

  async clickBookNow(card) {
    logger.info('Clicking Book Now on matched event card');
    await card.getByTestId('book-now-btn').click();
  }

  async assertCardCount(expectedCount) {
    const count = await this.allEventCards.count();
    if (count !== expectedCount)
      throw new Error(`Expected ${expectedCount} event cards but found ${count}`);
    logger.info(`Event card count verified: ${count}`);
  }

  async assertBannerVisible() {
    await this.sandboxBanner.waitFor({ state: 'visible', timeout: 10000 });
    logger.info('Sandbox banner is visible');
  }

  async assertBannerContains(text) {
    const content = await this.sandboxBanner.innerText();
    if (!content.includes(text))
      throw new Error(`Banner does not contain "${text}". Actual: "${content}"`);
    logger.info(`Banner contains expected text: "${text}"`);
  }
}

module.exports = EventsPage;
