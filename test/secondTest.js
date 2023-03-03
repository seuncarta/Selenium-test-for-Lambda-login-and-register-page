const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser("firefox").build();
    try {
        await driver.get('https://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
    /*

    var actualUrl = window.location.href
    var expectedUrl = "https://www.browserstack.com/users/sign_in";    
    // assert.strictEqual(actualUrl, expectedUrl, "This test case failed")
        var assert = require('assert');
    assert(actualUrl != expectedUrl, "My message goes here");
    */

})();