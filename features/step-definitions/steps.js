import { Given, When, Then } from '@wdio/cucumber-framework';

import MainPage from '../pageobjects/main.page';
import ResultPage from '../pageobjects/result.page';
import utils from '../utilities/utils';

/**
 * implementation of the all steps which written in feature files
 */

Given("I am on the main page", async () => {
    await MainPage.open()
    // to accept cookies popup
    await MainPage.clickButton("I Accept");
});

When("I enter {string} to the {string} box and select {int}. option", async (value, inputBoxName, option ) => {
    await MainPage.enterAndSelectValue(value, inputBoxName, option);
});

When("I select {string} date as {string} {string}", async (arg, day, month ) => {
    await MainPage.selectDate(arg, day, month);
}) 

When ("I click {string} button", async (button) => {
    await MainPage.clickButton(button);
})

When ("I click {string} bar button", async (button) => {
    await ResultPage.clickBarButton(button);
})

When ("I click {string} text button", async (button) => {
    await MainPage.clickSubButton(button);
})

When ("I click {string} check point", async (label) => {
    await ResultPage.clickCheckPoint(label);
})

When ("I slide left {string} handler until {int}", async (header, value ) => {
    await ResultPage.slideLeftHandler1(header, value);
})

Then ("I should be able to see all airlines as {string}", async (airline) => {
    await ResultPage.waitForFiltering();
    await expect( await ResultPage.allAirlines).toBeElementsArrayOfSize(await ResultPage.specificAirlines(airline).length);
})

Then ("I should not be able to see any stopped flights", async () =>{
    await ResultPage.waitForFiltering();
    await expect( await ResultPage.allSegmentflightStopInfo).toBeElementsArrayOfSize(0);
})

Then ("I should be able to see all standart prices less than {int}", async (price) => {
    await ResultPage.waitForFiltering();
    let standardPrices = [];
    await ResultPage.allSegmentStandardPrice.forEach(async element => {
        if ( await utils.getIntFromString(await element.getText())  > price ){
            standardPrices.push(await utils.getIntFromString(await element.getText()));     
        }
    });
    await expect(standardPrices.length).toEqual(0)
})
