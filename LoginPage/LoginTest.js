const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("assert");

describe("Log in using a valid credentials", function () {

    it("successfully Log in using a valid credential", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.get('https://accounts.lambdatest.com/login');

        let username = await driver.findElement(By.id("email"));
        username.sendKeys("seuncarta@gmail.com");

        let password = await driver.findElement(By.id("password"));
        password.sendKeys("Economicedu$156");

        let login = await driver.findElement(By.id("login-button"));
        await login.click();

        await driver.wait(until.urlIs('https://accounts.lambdatest.com/dashboard'), 3000, 'Showld load dashboard page');


        //Close browser
        await driver.quit();

    })

})

describe("Log in using a valid email but a wrong password", function () {

    it("Verify logging in using an incorrect password", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.get('https://accounts.lambdatest.com/login');

        let username = await driver.findElement(By.id("email"));
        username.sendKeys("seuncarta@gmail.com");

        let password = await driver.findElement(By.id("password"));
        password.sendKeys("Economicedu");

        let login = await driver.findElement(By.id("login-button"));
        login.click();

        await driver.manage().setTimeouts({ implicit: 3000 });

        let errorMessage = await (await driver.findElement(By.css('p[data-testid="errors-password"]'))).getText();

        assert.strictEqual(errorMessage, "Please enter a correct username and password. Note that the password is case-sensitive. After 4 unsuccessful attempts your account will be locked.", 'error message from wrong password');

        //Close browser
        await driver.quit();

    })

})

describe("Log in using a wrong email (not previously registered on the app) but correct password", function () {

    it("Verify logging in using a wrong email", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.get('https://accounts.lambdatest.com/login');

        let username = await driver.findElement(By.id("email"));
        username.sendKeys("seunjr7@gmail.com");

        let password = await driver.findElement(By.id("password"));
        password.sendKeys("Economicedu$156");

        let login = await driver.findElement(By.id("login-button"));
        login.click();

        await driver.manage().setTimeouts({ implicit: 3000 });

        let errorMessage = await (await driver.findElement(By.css('p[data-testid="errors-email"]'))).getText();

        assert.strictEqual(errorMessage, "Please enter a correct username and password. Note that the password is case-sensitive", 'error message from wrong email');
        //Close browser
        await driver.quit();

    })

})

describe("Log in with email field empty", function () {

    it("Verify logging in using an empty email (email field empty)", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.get('https://accounts.lambdatest.com/login');

        let username = await driver.findElement(By.id("email"));
        username.sendKeys("");

        let password = await driver.findElement(By.id("password"));
        password.sendKeys("Economicedu$156");

        let login = await driver.findElement(By.id("login-button"));
        login.click();

        let errorMessage = await (await driver.findElement(By.css('p[data-testid="errors-email"]'))).getText();

        assert.strictEqual(errorMessage, "Please enter your email", 'error message from empty email');

        //Close browser
        await driver.quit();

    })

})

describe("Log in using Verify leaving the password filed empty", function () {

    it("Verify leaving the password filed empty", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.get('https://accounts.lambdatest.com/login');

        let password = await driver.findElement(By.id("password"));
        password.sendKeys("");

        let username = await driver.findElement(By.id("email"));
        username.sendKeys("seuncarta@gmail.com");

        let login = await driver.findElement(By.id("login-button"));
        login.click();

        let errorMessage = await (await driver.findElement(By.css('p[data-testid="errors-password"]'))).getText();

        assert.strictEqual(errorMessage, "Please enter your password", 'error message from empty password');

        //Close browser
        await driver.quit();

    })

})

describe("Log in using a wrong email (not a correct email format)", function () {

    it("Verify login while making a spelling error in the mail feild", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.get('https://accounts.lambdatest.com/login');

        let username = await driver.findElement(By.id("email"));
        username.sendKeys("seuncartagmail.com");

        let password = await driver.findElement(By.id("password"));
        password.sendKeys("Economicedu$156");

        let login = await driver.findElement(By.id("login-button"));
        login.click();

        let errorMessage = await (await driver.findElement(By.css('p[data-testid="errors-email"]'))).getText();

        assert.strictEqual(errorMessage, "Invalid email address", 'error message from wrong email');

        //Close browser
        await driver.quit();

    })

})