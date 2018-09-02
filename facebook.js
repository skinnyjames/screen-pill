const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()
const PageObject = require('./index')

function FacebookHome(driver) {
  this.loadDriver(driver)
  this.url('http://www.facebook.com')
  this.selectList('birthdayMonth', {id: 'month'})

  this.changeBirthday = async function() {
    await this.visit()
    let options = await this.birthdayMonth.options() 
    return this.birthdayMonth.select(options[3])
  }

}

PageObject(FacebookHome)

home = new FacebookHome(driver)

home.changeBirthday()
