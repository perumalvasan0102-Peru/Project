@regression @setup2
Feature: Refund Eligibility Check
  As a customer
  I want to check refund eligibility for my bookings
  So that I know whether I qualify for a refund

  @eligible-refund
  Scenario: Single ticket booking is eligible for refund
    Given I am logged in to EventHub
    When I navigate to the events listing page
    And I click Book Now on the first available event card
    And I fill in the booking details
    And I confirm the booking

    When I click View My Bookings
    Then the URL should be the bookings page
    When I click View Details on the first booking card
    Then the page should show Booking Information

    And the first character of the booking reference should match the first character of the event title

    When I click Check Refund Eligibility
    Then the refund spinner should appear
    And the refund spinner should disappear within 6 seconds

    Then the refund result should be visible
    And the refund result should contain "Eligible for refund"
    And the refund result should contain "Single-ticket bookings qualify for a full refund"

  @non-eligible-refund
  Scenario: Group ticket booking (3 tickets) is NOT eligible for refund
    Given I am logged in to EventHub
    When I navigate to the events listing page
    And I click Book Now on the first available event card with at least 3 seats
    And I increase the ticket quantity by 2
    And I fill in the booking details
    And I confirm the booking

    When I click View My Bookings
    Then the URL should be the bookings page
    When I click View Details on the first booking card
    Then the page should show Booking Information

    When I click Check Refund Eligibility
    Then the refund spinner should appear
    And the refund spinner should disappear within 6 seconds

    Then the refund result should be visible
    And the refund result should contain "Not eligible for refund"
    And the refund result should contain "Group bookings (3 tickets) are non-refundable"
