'use strict';

const logger = require('../utils/logger');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput     = page.getByPlaceholder('you@email.com');
    this.passwordInput  = page.getByLabel('Password');
    this.signInButton   = page.locator('#login-btn');
    this.browseEventsLink = page.getByRole('link', { name: 'Browse Events' }).first();
    this.errorAlert     = page.locator('.alert, [role="alert"]');
  }

  async navigate() {
    logger.info('Navigating to login page');
    await this.page.goto('/login');
  }

  async fillEmail(email) {
    logger.info(`Filling email: ${email}`);
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    logger.info('Clicking Sign In button');
    await this.signInButton.click();
  }

  async login(email, password) {
    await this.navigate();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
    await this.page.waitForLoadState('networkidle');
    logger.info('Login submitted');
  }

  async assertLoginSuccess() {
    await this.browseEventsLink.waitFor({ state: 'visible', timeout: 10000 });
    logger.info('Login success confirmed — Browse Events link visible');
  }
}

module.exports = LoginPage;
