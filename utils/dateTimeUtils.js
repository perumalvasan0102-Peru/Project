'use strict';

/**
 * Returns a future date/time string formatted as YYYY-MM-DDTHH:MM for datetime-local inputs.
 * @param {number} daysAhead - Number of days ahead from today (default 30)
 */
function futureDateValue(daysAhead = 30) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  date.setHours(10, 0, 0, 0);
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Returns the current date formatted as YYYY-MM-DD.
 */
function currentDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Returns a human-readable timestamp: e.g. 2026-06-28 14:30:00
 */
function currentTimestamp() {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
}

/**
 * Generates a unique suffix using Date.now().
 */
function uniqueSuffix() {
  return Date.now().toString();
}

/**
 * Formats a Date object to a locale date string.
 * @param {Date} date
 */
function formatDate(date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

module.exports = { futureDateValue, currentDate, currentTimestamp, uniqueSuffix, formatDate };
