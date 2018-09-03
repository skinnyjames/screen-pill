const { setWorldConstructor, AfterAll, BeforeAll } = require('cucumber')
const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()
const PageFactory = require('./../../../page-factory')
var glance = require('glance')
var g

BeforeAll(function(cb) {
  g = glance({ dir: 'test/html'})
  g.start()
  cb()
})

AfterAll(function() {
  g.stop()
  driver.quit()
})


class CustomWorld {
  constructor() {
    this.driver = driver
    Object.assign(this, PageFactory)
  }
}

setWorldConstructor(CustomWorld)
