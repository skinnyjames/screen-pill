const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()
const PageObject = require('./index')(driver)


// Google Search
function GoogleSearch() {

  this.url('http://www.google.com')

  this.textField('terms', {id: 'lst-ib'})
  this.button('submit', {name: 'btnK'})

  this.search = function(query) {
    return this.terms.set(query)
    .then(_ => {
      this.driver.executeScript("document.getElementById('lst-ib').blur();")
    })
    .then(_ => {
      this.submit.click()
    })
  }

  return this
}

GoogleSearch.prototype = new PageObject()

// Result page
function GoogleSearchResults() {

  this.div('stats', {id: 'resultStats'})

  return this
}

GoogleSearchResults.prototype = new PageObject()

let searchPage = new GoogleSearch()
let results = new GoogleSearchResults()

searchPage.visit()
/*
.then(_ => {
  return searchPage.search('bottle')
})
*/
.then(_ => {
  return searchPage.terms.set('cats')
})
.then(_ => {
  return searchPage.terms.waitUntil(catDog, 10000, 'cat not dog')
})
.then(_ => {
  return results.stats.waitUntilPresent()
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
