
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
var should = require("chai").should();
// var expect = require("chai");
// var assert = require("chai");

//Describe block

describe("add a todo task test", function () {

    //It block
    it("successfully added a todo to our application", async function () {

        //Lunch the browser
        let driver = await new Builder().forBrowser("chrome").build();

        //navigate to our application
        await driver.get("https://lambdatest.github.io/sample-todo-app/")

        //add a todo
        //using locators
        await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);


        //assert
        let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function (value) {
            return value
        });

        // let buttonText = await driver.findElement(By.id("addbutton")).getText().then(function (value) {
        //     return value
        // });



        //assert using node assertion
        // assert.strictEqual(todoText, "Learn Selenium");

        /*
        let URL = await driver.getCurrentUrl();
        assert.strictEqual(URL, "https://lambdatestio/sample-todo-app/");
        URL.should.equal("https://lambdatest.github.io/sample-todo-app/")
        */
        

        //assert using chai should
        todoText.should.equal("Learn Selenium")
        // buttonText.should.equal("Learn")

        //close the browser
        await driver.quit();

    })

})



