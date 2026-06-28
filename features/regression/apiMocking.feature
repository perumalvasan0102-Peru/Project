@regression @setup3
Feature: API Mocking — Event Count Banner Visibility
  As a tester
  I want to mock the events API response
  So that I can verify the sandbox banner appears only when 6 events are returned

  @banner-visible
  Scenario: Banner IS visible when API returns 6 events
    Given the events API is mocked to return 6 events
    When I login and navigate to the events page
    Then there should be exactly 6 event cards displayed
    And the sandbox banner should be visible
    And the banner should contain "9 bookings"
