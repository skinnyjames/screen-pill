const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()
const PageObject = require('./index')(driver)


// Google Search
function GoogleSearch() {

  this.url('http://www.google.com')
  this.textField('terms', {id: 'lst-ib'})

  return this
}

GoogleSearch.prototype = new PageObject()

// Result page
function GoogleSearchResults() {

  this.div('stats', {id: 'resultStats'})

  return this
}

GoogleSearchResults.prototype = new PageObject()

let search = new GoogleSearch()
let results = new GoogleSearchResults()

search.visit()
.then(_ => {
  return search.terms.set('cats')
})
.then(_ => {
  return search.terms.waitUntil(catDog, 10000, 'cat not dog')
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
