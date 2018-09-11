const { Given, When, Then, And } = require('cucumber')
const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect
const AsyncPage = require('./../pages/async')


When(/I visit a page with a url parameter/, async function() {
  var page = new AsyncPage(this.driver)
  return await page.visit('http://localhost:8080/async.html')
})

Then(/I can get the page text/, async function() {
  return this.on(AsyncPage, async (page) => {
    await page.hello.waitUntilPresent()
    let text = await page.text()
    expect(text).to.eql('screen-pill')
  })
})
