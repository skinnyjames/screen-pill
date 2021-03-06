
<p align="center">
 <a href="https://github.com/skinnyjames/screen-pill">
   <img align="center" src="https://i.imgur.com/cMv6ase.png" width="300">
  </a>
</p>

# screen-pill  [![Build Status](https://travis-ci.org/skinnyjames/screen-pill.svg?branch=master)](https://travis-ci.org/skinnyjames/screen-pill) ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg) [![Coverage Status](https://coveralls.io/repos/github/skinnyjames/screen-pill/badge.svg?branch=master)](https://coveralls.io/github/skinnyjames/screen-pill?branch=master) [![Dependencies](https://david-dm.org/skinnyjames/screen-pill.svg)](https://david-dm.org/skinnyjames/screen-pill.svg)





library for creating page objects in javascript

inpsired by cheezy's ruby [implementation](https://github.com/cheezy/page-object)

check out the [cucumber demo](https://github.com/skinnyjames/cucumber-js)

## install

`npm install screen-pill`

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

search()

```

## documentation

see `/test` for examples using cucumber and chai

see [wiki](https://github.com/skinnyjames/screen-pill/wiki/Screen-Pill) for api and usage


## under active development (contributions welcome)

### contributors

* sean gregory
* phil jordan

### special thanks

* jesse keane


