Feature: Welcome Screen
  As a new user of GigGrid
  I want to see a welcoming landing screen
  So that I can understand the app's purpose and get started

  Background:
    Given the app is launched for the first time
    And the user is not authenticated

  Scenario: Display welcome screen with branding
    Given I am on the welcome screen
    Then I should see the "GigGrid" app title
    And I should see the tagline "Your music career starts here"
    And I should see the welcome message "Welcome to GigGrid"
    And I should see the subtitle "Connect with venues, book gigs, and grow your music career"

  Scenario: Primary call-to-action button
    Given I am on the welcome screen
    When I see the "Get Started" button
    Then the button should be prominently displayed
    And the button should be accessible
    When I tap the "Get Started" button
    Then I should see a confirmation message about login functionality

  Scenario: Social connection options
    Given I am on the welcome screen
    Then I should see "or connect with" text
    And I should see social connection options
    When I tap on a social connection button
    Then I should see a message about social authentication

  Scenario: Terms and privacy information
    Given I am on the welcome screen
    Then I should see the footer text about Terms of Service and Privacy Policy
    And the text should be clearly readable

  Scenario: Cross-platform compatibility
    Given I am using the app on <platform>
    When I view the welcome screen
    Then the layout should be responsive
    And all elements should be properly aligned
    And the color scheme should match the design system

    Examples:
      | platform |
      | iOS      |
      | Android  |
      | Web      |

  Scenario: Accessibility compliance
    Given I am on the welcome screen
    When I use a screen reader
    Then all interactive elements should have proper accessibility labels
    And the text should have sufficient color contrast
    And keyboard navigation should work properly on web

  Scenario: Performance requirements
    Given I launch the app
    When the welcome screen loads
    Then it should load within 3 seconds on 3G
    And the screen should respond to interactions within 100ms
    And memory usage should remain under acceptable limits
