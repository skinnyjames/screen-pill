const { Given, When, Then, And } = require('cucumber')
const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect
const IndexPage = require('./../pages/index')

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
