const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()
const PageObject = require('./index')(driver)


// Google Search
function GoogleSearch() {

  this.url('http://www.google.com')
  this.textField('terms', {name: 'q'})
  this.submit('google')
  this.submit('feelingLucky', {index: 1})

  this.search = function(query) {
    return this.terms.set(query)
    .then(_ => {
      this.driver.executeScript("document.getElementById('viewport').click()")
    })
    .then(_ => {
      this.submit.click()
    })
  }

  return this
}

PageObject(GoogleSearch)


// Result page
function GoogleSearchResults() {

  this.div('stats', {css: '#resultStats', partialLinkText: 'About'})

  return this
}

PageObject(GoogleSearchResults)

let searchPage = new GoogleSearch()
let results = new GoogleSearchResults()

searchPage.visit()
.then(_ => {
  return searchPage.terms.waitUntilPresent(5000, 'terms not present')
})
.then(_ => {
  return searchPage.terms.set('cats')
})
.then(_ => {
  return searchPage.terms.waitUntil(catDog, 10000, 'cat not dog')
})
.then(_ => {
  return searchPage.driver.executeScript("document.getElementById('viewport').click();")
})
.then(_ => {
  return searchPage.google.waitUntilPresent(5000, 'submit not visible')
})
.then(_ => {
  return searchPage.google.click()
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

