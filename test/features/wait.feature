Feature: Waiting
  Screen Pills can wait

  Scenario: Wait until custom
    Given I visit home
    Then I can wait until a custom condition

  Scenario: Wait until present
    Given I visit an async page
    Then elements can wait until present

  Scenario: Custom Message & Timeout on waiting
    Given I visit an async page
    Then I can wait with custom options
