

import Page from './page';

class MainPage extends Page {
    get accept(){
        return $("//span[contains]")
    }
    /**
     * this locator is used for all types of input box elements to click
     * @param {*} arg name of the input box
     */
    inputBoxClick(arg) {
        return $("(//span[starts-with(text(),'"+arg+"')]/../following-sibling::div//div)[1]");
    }
    /**
     * this locator is used for all types of input box elements to enter a value
     * @param {arg} arg name of the input box
     */ 
    inputBoxType(arg) {
        return $("//span[starts-with(text(),'"+arg+"')]/../following-sibling::div//input[@type='text']");
    }
    /**
     * 
     * @param {*} inputBoxName  input box's name
     * @param {int} option index of the dropdown list
     */
    selectOptionFromInputBoxDropdown(inputBoxName, option) {
        return $("(//span[contains(text(),'"+inputBoxName+"')]/../following-sibling::div//div[contains(@id,'option-"+(option-1)+"')]//span)[1]");
    }
    
    /**
     * locator for all types of buttons like search flight
     * @param {arg} arg name of the button
     */
    btn(arg) {
        return $("(//span[starts-with(text(),'"+arg+"')]/../../button)[1]");
    }
    /**
     * locator for sub buttons like clear all, select all
     * @param {arg} arg name of sub button
     */    
    subBtn(arg) {
        return $("//span[starts-with(text(),'"+arg+"')]");
    }
    /**
     * locator for date box's mmonth
     */
    get datesMonth() {
        return $("//div[@class='DayPicker-Caption']/div")
    }
    /**
     * locator for date box's next arrow button
     */
    get datesNextButton() {
        return $("//button[@aria-label='Next month']")
    }
    /**
     * locator to select a day from date box
     * @param {day} day of the month
     */
    datesday(day) {
        return $("//div[@class='DayPicker-Body']//div[contains(@aria-label,' "+day+" ')]")
    }
    /**
     * function to enter from and to locations
     * @param {*} value location where you want to go from or to
     * @param {*} inputBoxName name of the input box
     */
    async enterAndSelectValue (value, inputBoxName, option) {
        await this.inputBoxClick(inputBoxName).waitForClickable();
        await this.inputBoxClick(inputBoxName).click()
        await this.inputBoxType(inputBoxName).setValue(value);
        await browser.pause(2000)
        await this.selectOptionFromInputBoxDropdown(inputBoxName, option).click();
    }
    /**
     * function to select departure and return dates
     * @param {*} arg input box's name
     * @param {*} day departure or return date's day
     * @param {*} month departure or return date's month
     */ 
    async selectDate(arg, day, month) {
        await browser.pause(3000)     
        await this.inputBoxClick(arg).click();
        console.log(await this.datesMonth.getText());
        while ( await this.datesMonth.getText() !== month) {
            await browser.pause(500)     
            await this.datesNextButton.click();   
            await browser.pause(500)         
        }
        await this.datesday(day).click();
    }
    /**
     * to click button
     * @param {*} button button name
     */
    async clickButton(button){
        await this.btn(button).waitForEnabled({timeouts:10000});
        await this.btn(button).click();
    }
    /**
     * to click sub buttons like clear all
     * @param {*} button button name
     */
    async clickSubButton(button){
        await this.subBtn(button).waitForEnabled({timeouts:10000});
        await this.subBtn(button).click();
    }

   
    open() {
        return super.open();
    }
}

export default new MainPage();
