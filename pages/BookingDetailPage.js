'use strict';

const logger = require('../utils/logger');

class BookingDetailPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.bookingInfoHeading   = page.getByRole('heading', { name: 'Booking Information' });
    // On the detail page the ref is in a ".font-mono" span; ".booking-ref" only exists on the list/confirmation pages
    this.bookingRefEl         = page.locator('.font-mono').first();
    this.eventTitleEl         = page.getByRole('heading', { level: 1 });
    this.checkRefundBtn       = page.getByTestId('check-refund-btn');
    this.refundSpinner        = page.locator('#refund-spinner');
    this.refundResult         = page.locator('#refund-result');
    this.backToBookingsLink   = page.getByRole('link', { name: /Back to My Bookings/ });
  }

  async assertBookingInfoVisible() {
    await this.bookingInfoHeading.waitFor({ state: 'visible', timeout: 10000 });
    logger.info('Booking Information section is visible');
  }

  async getBookingRef() {
    const ref = (await this.bookingRefEl.innerText()).trim();
    logger.info(`Booking ref on detail page: ${ref}`);
    return ref;
  }

  async getEventTitle() {
    const title = (await this.eventTitleEl.innerText()).trim();
    logger.info(`Event title on detail page: ${title}`);
    return title;
  }

  async clickCheckRefundEligibility() {
    logger.info('Clicking Check Refund Eligibility button');
    await this.checkRefundBtn.click();
  }

  async assertSpinnerVisible() {
    await this.refundSpinner.waitFor({ state: 'visible', timeout: 5000 });
    logger.info('Refund spinner is visible');
  }

  async assertSpinnerHidden(timeout = 6000) {
    await this.refundSpinner.waitFor({ state: 'hidden', timeout });
    logger.info('Refund spinner disappeared');
  }

  async assertRefundResultVisible() {
    await this.refundResult.waitFor({ state: 'visible', timeout: 10000 });
    logger.info('Refund result is visible');
  }

  async assertRefundResultContains(text) {
    const content = await this.refundResult.innerText();
    if (!content.includes(text))
      throw new Error(`Refund result does not contain "${text}". Actual: "${content}"`);
    logger.info(`Refund result contains: "${text}"`);
  }

  async validateBookingRefVsEventTitle() {
    const ref = await this.getBookingRef();
    const title = await this.getEventTitle();
    const refFirst = ref.trim().charAt(0).toUpperCase();
    const titleFirst = title.trim().charAt(0).toUpperCase();
    if (refFirst !== titleFirst)
      throw new Error(`First char of booking ref "${refFirst}" !== first char of event title "${titleFirst}"`);
    logger.info(`Booking ref first char "${refFirst}" matches event title first char "${titleFirst}"`);
  }
}

module.exports = BookingDetailPage;
