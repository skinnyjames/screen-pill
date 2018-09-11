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

  Scenario: Textarea Field
    Given I visit home
    Then I can fill in the textarea field

  Scenario: Checkbox
    Given I visit home
    Then I can check the checkbox field

  Scenario: Radio Buttons
    Given I visit home
    Then I can select a radio field

  Scenario: Labels
    Given I visit home
    Then clicking a label will click a checkbox

  Scenario: Files
    Given I visit home
    Then I can upload a file

  Scenario: Submit Button
    Given I visit home
    Then I can click a submit button
  
  Scenario: Generic Element
    Given I visit home
    Then I can get a generic nested element
