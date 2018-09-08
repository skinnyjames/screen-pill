[![Build Status](https://travis-ci.org/skinnyjames/screen-pill.svg?branch=master)](https://travis-ci.org/skinnyjames/screen-pill)

# screen-pill

page object pattern implemented in javascript

inpsired by cheezy's ruby [implementation](https://github.com/cheezy/page-object)

check out the [cucumber demo](https://github.com/skinnyjames/cucumber-js)

## usage

declare a function to encapsulate a web page

```javascript

// google-search.js

const ScreenPill = require('screen-pill')

function GoogleSearch(driver) {

  this.setDriver(driver)

  this.directUrl('http://www.google.com')

  this.textField('terms', {name: 'q'})
  this.submit('google')
  this.submit('feelingLucky', {index: 1})

  this.query = async function(query) {
    await this.terms.waitUntilPresent()
    await this.terms.set(query)
    await this.google.waitUntilPresent()
    return this.google.click()
  }

  return this
}

module.exports = ScreenPill(GoogleSearch)

```
instantiate with driver and use methods

```javascript

const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()
const GoogleSearch = require('google-search')

let searchPage = new GoogleSearch(driver)

async function search() {
  await searchPage.visit()
  return searchPage.query('cats')
}

```

## api

currently supported elements are:

**generic element**

* ~~element~~ 

**form elements** 

* ~~text field~~
* ~~password field~~
* ~~select~~
* ~~radio~~
* ~~label~~
* ~~checkbox~~
* ~~submit~~
*  ~~textarea~~
* ~~button~~
* ~~file~~

**block and inline elements**

* ~~link~~
* ~~div~~
* ~~span~~
* ~~em, strong~~
* ~~h1, h2, h3, h4, h5, h6~~
* ~~ul, ol, li~~
* ~~p~~
* ~~td~~

** TODO **

* image
* table
* tr

All elements come with the following methods

* `waitUntil(callback(element), timeout, message)`
* `waitUntilPresent(timeout, message)`
* `allElements() // returns promise of selenium elements`
* `element() //returns promise with selenium element`

## under active development (contributions welcome)

This library will only continue to grow
ideas and contributions welcome!

### contributors

* sean gregory

### special thanks

* phil jordan
* jesse keane


