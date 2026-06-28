'use strict';

const { setWorldConstructor, World } = require('@cucumber/cucumber');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.page    = null;
    this.context = null;
    this.browser = null;
    // Shared state across steps within a scenario
    this.eventTitle         = '';
    this.seatsBeforeBooking = 0;
    this.seatsAfterBooking  = 0;
    this.bookingRef         = '';
    this.yahooBookingId     = '';
    this.apiToken           = '';
  }
}

setWorldConstructor(CustomWorld);
