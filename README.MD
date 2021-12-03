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
```

### Folder structure

- config - This folder contains `wdio.config.js`.
- featureFiles - This folder contains all `.feature` files.
- step-definitions - This folder contains the required implementation files
- reports - This folder contains `index.html` for the generated reports.

### Reports used

`multiple-cucumber-html-reporter`
