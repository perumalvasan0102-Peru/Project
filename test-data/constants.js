'use strict';

const BASE_URL = process.env.BASE_URL || 'https://eventhub.rahulshettyacademy.com';
const API_URL  = process.env.API_URL  || 'https://api.eventhub.rahulshettyacademy.com/api';

const USERS = {
  PRIMARY: { email: 'perumaltester@gmail.com', password: 'Tester@123' },
  YAHOO:   { email: 'yahootester01@yahoo.com', password: 'Tester@123' },
  GMAIL:   { email: 'gmailTester02@gmail.com', password: 'Tester@123' },
};

// Mock API responses used in Setup-3 network interception tests
const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025',     category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC',                                    city: 'Hyderabad', price: '999',  totalSeats: 200,  availableSeats: 150,  imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',      category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds',                           city: 'Bangalore', price: '1500', totalSeats: 500,  availableSeats: 300,  imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',           category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy',                              city: 'Bangalore', price: '2000', totalSeats: 800,  availableSeats: 50,   imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop',   category: 'Workshop',   eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork',                                   city: 'Mumbai',    price: '500',  totalSeats: 50,   availableSeats: 20,   imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India',   category: 'Festival',   eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse',                     city: 'Mumbai',    price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',         category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750',  totalSeats: 300,  availableSeats: 180,  imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025',     category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC',           city: 'Hyderabad', price: '999',  totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',      category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',           category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy',    city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50,  imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop',   category: 'Workshop',   eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork',         city: 'Mumbai',    price: '500',  totalSeats: 50,  availableSeats: 20,  imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

const MESSAGES = {
  EVENT_CREATED:      'Event created!',
  BOOKING_CONFIRMED:  'Booking Confirmed!',
  ACCESS_DENIED:      'Access Denied',
  NOT_AUTHORIZED:     'You are not authorized to view this booking',
  ELIGIBLE_FOR_REFUND:       'Eligible for refund',
  SINGLE_TICKET_REFUND_MSG:  'Single-ticket bookings qualify for a full refund',
  NOT_ELIGIBLE_FOR_REFUND:   'Not eligible for refund',
  GROUP_BOOKING_REFUND_MSG:  'Group bookings (3 tickets) are non-refundable',
};

module.exports = { BASE_URL, API_URL, USERS, SIX_EVENTS_RESPONSE, FOUR_EVENTS_RESPONSE, MESSAGES };
