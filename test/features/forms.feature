Feature: Form interactions
  I can interact with forms using screen-pill classes

  Scenario: Select Box
    Given I visit home
    Then I can verify select values
    And I can select an option by value
    And I can select an option by index
    And I can select an option by text

  Scenario: Text Field
    Given I visit home
    Then I can fill in the text field

  Scenario: Password Field
    Given I visit home
    Then I can fill in the password field
