const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("assert");


describe("Sign up test on Lambda.", function () {

    it("Verify registration with valid data(fullname, email, password and phone number)", async function () {

        let driver = await new Builder().forBrowser("chrome").build();

        await driver.get("https://accounts.lambdatest.com/register");

        //Filled in your data
        let firstName = await driver.findElement(By.id("name"));
        firstName.sendKeys("Michael");

        let userEmail = await driver.findElement(By.id("email"));
        userEmail.sendKeys("Michael@gmail.com");

        let password = await driver.findElement(By.id("userpassword"));
        password.sendKeys("MichaelSam2023");

        let phoneNumber = await driver.findElement(By.id("phone"));
        phoneNumber.sendKeys("08134589945");

        let signUp = await driver.findElement(By.css('button[data-amplitude="R_signup"]'));
        await signUp.click();

        await driver.wait(until.urlIs('https://accounts.lambdatest.com/email/verify'), 3000, 'Showld load the account verification page');

        //Close browser when done
        await driver.quit();

    });
    
    it("Verify registration with less than 8 character password", async function () {
    
        let driver = await new Builder().forBrowser("chrome").build();
    
        await driver.get("https://accounts.lambdatest.com/register");
    
        //Filled in your data
        let firstName = await driver.findElement(By.id("name"));
        firstName.sendKeys("Michael");
    
        let userEmail = await driver.findElement(By.id("email"));
        userEmail.sendKeys("Samuel@gmail.com");
    
        let password = await driver.findElement(By.id("userpassword"));
        password.sendKeys("Mic2023");
    
        let phoneNumber = await driver.findElement(By.id("phone"));
        phoneNumber.sendKeys("08134589945");
    
        let signUp = await driver.findElement(By.css('button[data-amplitude="R_signup"]'));
        await signUp.click();
    
        let errorMessage = await (await driver.findElement(By.css('p[data-testid="errors-password"]'))).getText();
    
        assert.strictEqual(errorMessage, "Password should be at least 8 characters long", 'error message from less than 8 character password');
    
        //Close browser when done
        await driver.quit();
    
    });

    it("Verify registration with an already registered email", async function () {
    
        let driver = await new Builder().forBrowser("chrome").build();
    
        await driver.get("https://accounts.lambdatest.com/register");
    
        //Filled in your data
        let firstName = await driver.findElement(By.id("name"));
        firstName.sendKeys("Michael");
    
        let userEmail = await driver.findElement(By.id("email"));
        userEmail.sendKeys("Seuncarta@gmail.com");
    
        let password = await driver.findElement(By.id("userpassword"));
        password.sendKeys("Mathesakf");
    
        let phoneNumber = await driver.findElement(By.id("phone"));
        phoneNumber.sendKeys("08134589945");
    
        let signUp = await driver.findElement(By.css('button[data-amplitude="R_signup"]'));
        await signUp.click();
    
        /*
        The error message is not visible until you click login,
        the below code is telling the runner to wait for 3 seconds
        after clicking for the element "error message" to become 
        */
        
        await driver.wait(until.elementLocated(By.css('p[data-testid="errors-email"]')), 3000)
    
        //To test the error message displayed is the correct one for an already registered email
    
        let errorMessage = await (await driver.findElement(By.css('p[data-testid="errors-email"]'))).getText();
    
        assert.strictEqual(errorMessage, "This Email is already registered", 'error message from an already registered');
    
        //Close browser when done
        await driver.quit();
    
    });

    it("Verify registration using a wrong email (not a correct email format)", async function () {
    
        let driver = await new Builder().forBrowser("chrome").build();
    
        await driver.get("https://accounts.lambdatest.com/register");
    
        //Filled in your data
        let firstName = await driver.findElement(By.id("name"));
        firstName.sendKeys("Michael");
    
        let userEmail = await driver.findElement(By.id("email"));
        userEmail.sendKeys("Samuelgmail.com");
    
        let password = await driver.findElement(By.id("userpassword"));
        password.sendKeys("Mic202sas3");
    
        let phoneNumber = await driver.findElement(By.id("phone"));
        phoneNumber.sendKeys("08134589945");
    
        let signUp = await driver.findElement(By.css('button[data-amplitude="R_signup"]'));
        await signUp.click();
    
        let errorMessage = await (await driver.findElement(By.css('p[data-testid="errors-email"]'))).getText();
    
        assert.strictEqual(errorMessage, "Invalid email address", 'error message from less than 8 character password');
    
        //Close browser when done
        await driver.quit();
    
    });

});