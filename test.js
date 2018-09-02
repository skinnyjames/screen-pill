const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()
const PageObject = require('./index')


// Google Search
function GoogleSearch(driver) {

  this.setDriver(driver)

  this.setUrl('http://www.google.com')

  this.textField('terms', {name: 'q'})
  this.submit('google')
  this.submit('feelingLucky', {index: 1})

  this.query = async function(query) {
    await this.terms.waitUntilPresent()
    await this.terms.set(query)
    await this.driver.executeScript("document.getElementById('viewport').click()")
    await this.google.waitUntilPresent()
    return this.google.click()
  }

  return this
}

PageObject(GoogleSearch)


// Result page
function GoogleSearchResults(driver) {

  this.setDriver(driver)

  this.div('stats', {css: '#resultStats', partialLinkText: 'About'})

  return this
}

PageObject(GoogleSearchResults)

let searchPage = new GoogleSearch(driver)
let results = new GoogleSearchResults(driver)

searchPage.visit()
.then(_ => {
  return searchPage.query('cats')
})
.then(_ => {
  return results.stats.waitUntilPresent(5000, 'Stats not present')
})
.then(_ => {
  return results.stats.get()
})
.then((stats) => {
  console.log(stats)
})
.catch((error) => {
  console.log('ERROR', error)
})

function catDog (element) {
  return element.getAttribute('value')
  .then((value) => {
    return value == 'dog' 
  })
}

