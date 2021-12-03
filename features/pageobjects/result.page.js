import utils from '../utilities/utils';
import Page from './page';

class ResultPage extends Page {

/**
 * locator for all the check point elements based on it's label
 * @param {*} label check point's label
 */  
checkPoint(label){
    return $("//label[starts-with(text(),'"+label+"')]/preceding-sibling::div")
}
/**
 * locator of the button which is in a bar
 * @param {string} label name of the button
 */
barButton(label){
    return $("//*[starts-with(text(),'"+label+"')][contains(@class,'BarButton')]")
}

/**
 * list of all listed flights' airlines
 */
get allAirlines(){
    return $$("//section[contains(@data-testid,'resultPage-resultTrip')]//section//img[contains(@alt,'')]")
}
/**
 * gives all flights' stop info locators in a list
 */
get allSegmentflightStopInfo(){
    return $$("//p[@data-testid='searchResults-segment-stops']")
}

/**
 * list of locators which all segments'standard price
 */
get allSegmentStandardPrice(){
    return $$("//span[contains(@data-testid,'result-trip-price-standard')]")
}

/**
 * lacatior of loading dots which are become enable after filtering some options
 */
get loadingDots(){
    return $("//*[contains(@data-testid,'loadingDots')]")
}
/**
 * just selected airlines' list in all listed flights
 * @param {*} airline airline name
 */
specificAirlines(airline){
    return $$("//section[contains(@data-testid,'resultPage-resultTrip')]//section//img[contains(@alt,'"+airline+"')]")
}
/**
 * this locator can be use of all type of slider tracks whhich are in the filtering page
 * left handle of the slider track
 * @param {string} header  header of the slider track
 */
sliderTracksHandle0(header){
    header = header.toUpperCase()
    return $("(//header[contains(@data-testid,'resultPage-"+header+"')]/following-sibling::div//*[contains(@data-testid,'handle-0')])[1]")
}
/**
 * this locator can be use of all type of slider tracks whhich are in the filtering page
 * right handle of the slider track
 * @param {string} header  header of the slider track
 */
sliderTracksHandle1(header){
    header = header.toUpperCase()
    return $("(//header[contains(@data-testid,'resultPage-"+header+"')]/following-sibling::div//*[contains(@data-testid,'handle-1')])[1]")
}
/**
 * this locator can be use of all type of slider tracks whhich are in the filtering page
 * left handle's value of the slider track
 * @param {string} header  header of the slider track
 */
sliderTracksHandle0Value(header){
    header = header.toUpperCase()
    return $("(//header[contains(@data-testid,'resultPage-"+ header +"')]/following-sibling::div//*[contains(@class,'slider-tracks')]/following-sibling::div)[1]")
}
/**
 * this locator can be use of all type of slider tracks whhich are in the filtering page
 * right handle's value of the slider track
 * @param {string} header  header of the slider track
 */
sliderTracksHandle1Value(header){
    header = header.toUpperCase()
    return $("(//header[contains(@data-testid,'resultPage-"+ header +"')]/following-sibling::div//*[contains(@class,'slider-tracks')]/following-sibling::div)[2]")
}

/**
 * click to check point based on its label
 * @param {*} label check point's label
 */
async clickCheckPoint(label){
    await this.checkPoint(label).waitForEnabled();
    await this.checkPoint(label).click();
}

async clickBarButton(label){
    await this.barButton(label).waitForEnabled();
    await this.barButton(label).click();
}
/**
 * waits for loading dots' dissapear
 */
async waitForFiltering(){
    await browser.waitUntil(async () =>
      ! await this.loadingDots.isExisting(), {
      timeout: 10000,
      timeoutMsg: "filtration is not done yet"
    });
}
/**
 * 
 * @param {string} header header of the slider track
 * @param {string} value right handle's value of the slider track that wanted to be
 */
async slideLeftHandler1(header, value){
    let text =await this.sliderTracksHandle1Value(header).getText();

    while (parseInt(await utils.getIntFromString(text)) > value) {
        text =await this.sliderTracksHandle1Value(header).getText();
        await this.sliderTracksHandle1(header).dragAndDrop({ x: -10, y: 0 })    
    }

}

}

export default new ResultPage();
