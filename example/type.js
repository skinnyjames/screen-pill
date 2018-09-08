const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()

const ScreenPill = require('./../dist/screen-pill.js')

function GoogleSearch(driver) {

  this.setDriver(driver)
  this.directUrl('http://www.google.com')
  this.div('links', {id: 'gb'})

  this.pvisit = async function() {
    await this.visit()
    let data = await this.links.get()
    console.log(data)
  }

  return this
}

let GoogleSearchPage = ScreenPill(GoogleSearch)
let page = new GoogleSearchPage(driver)


page.pvisit()



