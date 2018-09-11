const { Given, When, Then, And } = require('cucumber')
const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect
const IndexPage = require('./../pages/index')
const AsyncPage = require('./../pages/async')

Given(/I visit an async page/, async function() {
  return this.visit(AsyncPage)
})

Then(/I can wait until a custom condition/, async function() {
  return this.on(IndexPage, async (page) => {
    setTimeout(() => {
      page.username.set('wait')
    }, 2000)

    return page.username.waitUntil(async function(element) {
      let username = await element.get()
      return username == 'wait'
    })
  })
})

Then(/elements can wait until present/, async function() {
  return this.on(AsyncPage, async (page) => {
    await page.hello.waitUntilPresent()
    let element = await page.hello.element()
    let text = await element.getText()
    expect(text).to.eql('screen-pill')
  })
})

Then(/I can wait with custom options/, async function() {
  return this.on(AsyncPage, async (page) => {
    return page.hello.waitUntilPresent({timeout: 100, message: 'hurry up!'})
    .catch(e => {
      expect(e.message).to.match(/hurry up!/)
    })
  })

  return this.visit(IndexPage, async (page) => {
    setTimeout(() => {
      page.username.set('slow')
    }, 2000)

    return page.username.waitUntil(async function(element) {
      let username = await element.get()
      return username == 'wait'
    }, {timeout: 100, message: "c'mon already!"})
    .catch(e => {
      expect(e.message).to.match(/c'mon already!/)
    })
  })
})
