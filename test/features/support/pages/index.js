const ScreenPill = require('./../../../../index')

function IndexPage(driver) {
  this.setDriver(driver)
  this.setUrl('localhost:8080')
  this.selectList('favoriteColor', { id: 'favorite-color'})
}
ScreenPill(IndexPage)

module.exports = IndexPage
