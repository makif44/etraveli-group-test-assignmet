class utils {
    
    /**
     * this function converts the list of webelements to the list of webelement's text
     * @param {webelemet} elements 
     */
    async getElementsTextInTheList(elements){
        let textList = [];
        for (const element in elements) {
            textList.push(element.getText().toString())
        }
        return textList;
    }

    /**
     * to get int value from text
     * @param {string} string 
     */
    async getIntFromString(string){
        return parseInt(string.match(/\b\d+(?:.\d+)?/).toString().replace(",",""));
    }
}

export default new utils();
