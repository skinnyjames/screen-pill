const { Given, When, Then } = require('cucumber')
const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect
const IndexPage = require('./../pages/index')


Given(/I visit home/, async function() {
  return this.visit(IndexPage)
})

Then(/I can verify select values/, async function() {
  return this.on(IndexPage, async (page) => {
    let colors = await page.favoriteColor.options()
    expect(colors).to.be.an('array')
    expect(colors).to.eql(['blue', 'red', 'green'])
  })
})
