# Cucumber WebdriverIO 

## Prerequisites

To use this project, you'll need:
- Node.js, a Long-Term Support (LTS) release version 14 or later 
- Java Runtime Environment (JRE) or a Java Development Kit (JDK) version 8 or later 
- Chrome web browser 


### Installation

```
npm install
```

### Execution

```
npm run Filtering_airlines          # runs Filtering_airlines test scenario
npm run Filtering_Number_Of_Stop    # runs Filtering_Number_Of_Stop test scenario 
npm run Filtering_Price             # runs Filtering_Price test scenario
npm run bug                         # runs the scenario which has bug
```

### Folder structure

- config - This folder contains `wdio.config.js`.
- featureFiles - This folder contains all `.feature` files.
- step-definitions - This folder contains the required implementation files
- reports - This folder contains `index.html` for the generated reports.

### Reports used

`multiple-cucumber-html-reporter`

### Some Explanations

- I used Xpath to find elements' locations. I make it easy to parametrize locations and can use those locators for other similar types of elements. For example, I use the same locator for finding 'From input box' and 'To input box' locations, and I can use the same function for different steps.

- I am not sure because I don't know the business requirements, but I think there is a bug. I specified the steps in the feature file with the bug tag.
Scenario with bugs' steps:
    When I write Athens to the From part and it lists some possible options. 
    I select the second one (Athens, USA, Georgia) 
    And select any location for To part (New York)
    And Search flights
    Then I should find some flights, but it doesn't
