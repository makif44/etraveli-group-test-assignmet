const fs = require('fs');
const rm = require('fs-extra');
const {generate} = require('multiple-cucumber-html-reporter');

const jsonTmpDirectory = `reports/json/tmp/`;
exports.config = {
  
    specs: [
        'features/featureFiles/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
  
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
    capabilities: [{
    
        maxInstances: 5,

        browserName: 'chrome',
        acceptInsecureCerts: true
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }],
   
    logLevel: 'error',
    
    bail: 0,
    
    baseUrl: 'https://www.flightnetwork.com/',
    
    waitforTimeout: 15000,
    
    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 3,
    
    services: ['chromedriver'],
   
    framework: 'cucumber',
   
    reporters: [
        ["spec",
            {
                onlyFailures: false,
            },
        ],
        ['cucumberjs-json', {
            jsonFolder: "./reports/json/tmp/html-report/",
            language: 'en',
           
        }, ],
    ],    

    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['./features/step-definitions/*.js', './tests/features/support/*.js'], // <string[]> (file/dir) require files before executing features
        backtrace: false, // <boolean> show full backtrace for errors
        requireModule: ['@babel/register'], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        format: ['[pretty]'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true, // <boolean> disable colors in formatter output
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: true, // <boolean> hide source uris
        profile: [], // <string[]> (name) specify the profile to use
        strict: false, // <boolean> fail if there are any undefined or pending steps
        tagExpression: '', // <string> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 60000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
        //scenarioLevelReporter: true, // Enable this to make webdriver.io behave as if scenarios and not steps were the tests.
    },
   
    onPrepare: () => {
       
        rm.removeSync("reports/json/tmp/html-report/");
     
        if (!fs.existsSync(jsonTmpDirectory)) {
            fs.mkdirSync(jsonTmpDirectory);
        }
        
    },
    onComplete: () => {
        generate({
            jsonDir: "reports/json/tmp/html-report/",
            reportPath: "reports/json/tmp/html-report/",
            // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
            openReportInBrowser: true,
            displayDuration: true,
            durationInMS: true,
            displayReportTime: true,
            useCDN: true,
            pageTitle: "Cuz Test Report",
            reportName: "Cuz Translation Test Automation Report",
            metadata: {
                browser: {
                    name: 'chrome',
                    version: '60'
                },
                device: 'Local test machine',
                platform: {
                    name: 'Windows',
                    version: '10'
                }
            },
            customData: {
                title: 'Run info',
                data: [{
                        label: 'Project',
                        value: 'Cuz Translation'
                    },
                    {
                        label: 'Release',
                        value: '1.2.3'
                    },
                    // {
                    //     label: 'Execution Start Time',
                    //     value: startTime
                    // },
                    // {
                    //     label: 'Execution End Time',
                    //     value: endTime
                    // }
                ]
            }
        });
    },
    beforeFeature: function (uri, feature, scenarios) {
        browser.maximizeWindow();
    },
   
    afterStep: function ({uri,feature,step}, context, {error,result,duration,passed}) {
        browser.takeScreenshot();
    },

    afterFeature: function (uri, feature, scenarios) {       
        browser.closeWindow();
    }
}
