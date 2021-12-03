Feature: Filter the flight results

  @airlines
  Scenario: As a user, I can filter the flight results by airlines

    Given I am on the main page
    When I enter "Athens" to the "From" box and select 1. option
    And I enter "Istanbul" to the "To" box and select 1. option
    And I select "Departure" date as "15" "January 2022"
    And I select "Return" date as "16" "January 2022"
    And I click "Search flights" button
    And I click "Filter by" button
    And I click "Clear all" text button
    And I click "Turkish Airline" check point
    Then I should be able to see all airlines as "Turkish Airlines"
  
  @numberOfStop
  Scenario: As a user, I can filter the flight results by number of stops

    Given I am on the main page
    When I enter "Athens" to the "From" box and select 1. option
    And I enter "Istanbul" to the "To" box and select 1. option
    And I select "Departure" date as "15" "January 2022"
    And I select "Return" date as "16" "January 2022"
    And I click "Search flights" button
    And I click "Filter by" button
    And I click "Nonstop flights" bar button
    Then I should not be able to see any stopped flights

  @price
  Scenario: As a user, I can filter the flight results by price

    Given I am on the main page
    When I enter "Athens" to the "From" box and select 1. option
    And I enter "Istanbul" to the "To" box and select 1. option
    And I select "Departure" date as "05" "January 2022"
    And I select "Return" date as "10" "January 2022"
    And I click "Search flights" button
    And I click "Filter by" button
    And I slide left "Price" handler until 2000
    Then I should be able to see all standart prices less than 2000

