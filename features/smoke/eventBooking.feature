@smoke @setup1
Feature: Event Creation and Booking — Seat Reduction Verification
  As an admin user
  I want to create an event and book a ticket
  So that I can verify the available seat count drops by exactly 1

  Scenario: Create event, book it, and verify seat count reduces by 1
    Given I am logged in to EventHub
    When I navigate to the admin events page
    And I create a new unique test event
    Then the event created toast should be visible

    When I navigate to the events listing page
    And I locate the newly created event card
    And I capture the seat count before booking
    And I click Book Now on the event card

    Then the ticket count defaults to 1
    When I fill in the booking details
    And I confirm the booking

    Then the booking reference should be visible
    When I store the booking reference
    And I click View My Bookings

    Then the URL should be the bookings page
    And my booking card with the stored reference should be visible
    And the booking card should contain the event title

    When I navigate back to the events page
    And I locate the event card again
    Then the seat count should be exactly 1 less than before booking
