Feature: Pill methods
  Pills have standard methods

  Scenario: Visit takes an optional url
    When I visit a page with a url parameter
    Then I can get the page text
