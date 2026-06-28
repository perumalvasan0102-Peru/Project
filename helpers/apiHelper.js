'use strict';

require('dotenv').config();
const logger = require('../utils/logger');

const API_URL = process.env.API_URL || 'https://api.eventhub.rahulshettyacademy.com/api';

/**
 * Logs in via REST API and returns the auth token.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<string>} JWT token
 */
async function apiLogin(request, credentials) {
  logger.info(`API login for: ${credentials.email}`);
  const res = await request.post(`${API_URL}/auth/login`, {
    data: { email: credentials.email, password: credentials.password },
  });
  if (!res.ok()) throw new Error(`API login failed: ${res.status()} ${await res.text()}`);
  const body = await res.json();
  const token = body.token || body.data?.token;
  if (!token) throw new Error('Token not found in login response');
  logger.info('API login successful, token obtained');
  return token;
}

/**
 * Fetches events list via API and returns the first event's ID.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} token
 * @returns {Promise<number>} eventId
 */
async function getFirstEventId(request, token) {
  const res = await request.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok()) throw new Error(`GET /events failed: ${res.status()}`);
  const body = await res.json();
  const eventId = body.data[0].id;
  logger.info(`First event ID from API: ${eventId}`);
  return eventId;
}

/**
 * Creates a booking via API.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} token
 * @param {object} payload
 * @returns {Promise<string>} bookingId
 */
async function createBookingViaApi(request, token, payload) {
  logger.info(`Creating booking via API for eventId: ${payload.eventId}`);
  const res = await request.post(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    data: payload,
  });
  if (!res.ok()) throw new Error(`POST /bookings failed: ${res.status()} ${await res.text()}`);
  const body = await res.json();
  const bookingId = body.data?.id || body.id;
  logger.info(`Booking created via API, ID: ${bookingId}`);
  return bookingId;
}

module.exports = { apiLogin, getFirstEventId, createBookingViaApi };
