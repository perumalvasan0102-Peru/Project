'use strict';

const logger = require('../utils/logger');

async function goTo(page, path) {
  logger.info(`Navigating to: ${path}`);
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

async function goToEvents(page)        { await goTo(page, '/events'); }
async function goToBookings(page)      { await goTo(page, '/bookings'); }
async function goToAdminEvents(page)   { await goTo(page, '/admin/events'); }
async function goToLogin(page)         { await goTo(page, '/login'); }

module.exports = { goTo, goToEvents, goToBookings, goToAdminEvents, goToLogin };
