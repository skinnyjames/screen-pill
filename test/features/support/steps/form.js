const { Given, When, Then, And } = require('cucumber')
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
    expect(colors).to.eql(['blue', 'red', 'green'])
  })
})

Then(/I can select an option by value/, async function() {
  return this.on(IndexPage, async (page) => {
    await page.favoriteColor.selectBy('value', 'green-value')
    let selected = await page.favoriteColor.get()
    expect(selected).to.eql('green')
  })
})

Then(/I can select an option by index/, async function() {
  return this.on(IndexPage, async (page) => {
    await page.favoriteColor.selectBy('index', 1)
    let selected = await page.favoriteColor.get()
    expect(selected).to.eql('red')
  })
})

Then(/I can select an option by text/, async function() {
  return this.on(IndexPage, async (page) => {
    await page.favoriteColor.select('blue')
    let selected = await page.favoriteColor.get()
    expect(selected).to.eql('blue')
  })
})

Then(/I can fill in the text field/, async function() {
  return this.on(IndexPage, async (page) => {
    await page.username.set('skinnyjames')  
    let username = await page.username.get()
    expect(username).to.eql('skinnyjames')
  })
})

Then(/I can fill in the password field/, async function() {
  return this.on(IndexPage, async (page) => {
    await page.password.set('password')
    let password = await page.password.get()
    expect(password).to.eql('password')
  })
})
