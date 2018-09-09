const resolve = require('path').resolve
const { setDefaultTimeout, setWorldConstructor, AfterAll, BeforeAll } = require('cucumber')
const webdriver = require('selenium-webdriver')


const chromeCapabilities = webdriver.Capabilities.chrome()
const chromeOptions = {
  'args': ['--no-sandbox']
}
chromeCapabilities.set('chromeOptions', chromeOptions)

const driver = new webdriver.Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build()

const PillFactory = require('./../../../dist/pill-factory')

setDefaultTimeout(15000)

var glance = require('glance')
var g

BeforeAll(function(cb) {
  g = glance({ dir: 'test/html'})
  g.start()
  setTimeout(function() {
    cb()
  }, 5000)
})

AfterAll(function() {
  g.stop()
  driver.quit()
})


function CustomWorld() {
  this.driver = driver
  this.filePath = resolve('test/files/guy.jpeg')
}

let World = PillFactory(CustomWorld)

setWorldConstructor(World)
