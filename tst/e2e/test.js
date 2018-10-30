"use strict"; 
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');

var webdriver = require('selenium-webdriver');

var cbtHub = "http://hub.crossbrowsertesting.com:80/wd/hub";

var username = 'urikugelmass@gmail.com';
var authkey = 'ua04ef9b43d67015';

var caps = {
    'name': 'Basic Test Example',
    'build': '1.0',
    'browserName': 'Internet Explorer',
    'version': '10',
    'platform': 'Windows 7 64-Bit',
    'screenResolution': '1366x768'
}

caps.username = username;
caps.password = authkey;

var driver = new webdriver.Builder()
    .usingServer(cbtHub)
    .withCapabilities(caps)
    .build(); 
 
function handleFailure(err) {
     console.error('Something went wrong!\n', err.stack, '\n');
     quitDriver();
} 
function quitDriver() {
    console.log("WebDriver is about to close.");
    driver.quit();
} 

describe( 'Test Suite' , function(){
 
    before(function(){
 
        driver.get( 'http://relievepoverty.me' );
    });
 
    after(function(){
        driver.quit();
 
    });
 
    it( 'Test Case', function(){
    
        driver.getTitle().then(function(title){
            expect(title).equals("Relieve Poverty");
            done();
        })
    });
});