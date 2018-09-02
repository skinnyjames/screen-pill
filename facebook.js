const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()
const PageObject = require('./index')(driver)

function FacebookHome() {
  this.url('http://www.facebook.com')
  this.selectList('birthdayMonth', {id: 'month'})
}

PageObject(FacebookHome)

home = new FacebookHome


home.visit()
.then(_ => {
  return home.birthdayMonth.options()
})
.then(value => {
  return home.birthdayMonth.selectBy('visibleText', 'Oct')
})
