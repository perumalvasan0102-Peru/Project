@regression @setup4
Feature: Cross-User Booking Access Control
  As a security-conscious application
  I want to prevent users from viewing other users' bookings
  So that booking data remains private

  Scenario: Gmail user cannot view Yahoo user's booking
    Given Yahoo user logs in via API and creates a booking
    And Gmail user logs in via the browser UI
    When Gmail user navigates to Yahoo user's booking URL
    Then the page should show "Access Denied"
    And the page should show "You are not authorized to view this booking"
