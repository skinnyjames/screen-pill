Feature: Waiting
  Screen Pills can wait

  Scenario: Wait until present
    Given I visit home
    Then I can wait until a custom condition
