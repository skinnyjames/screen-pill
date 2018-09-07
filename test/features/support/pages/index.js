const ScreenPill = require('./../../../../dist/screen-pill.js')

function IndexPage(driver) {
  this.setDriver(driver)
  this.directUrl('localhost:8080')

  this.selectList('favoriteColor', { id: 'favorite-color'})
}

module.exports = ScreenPill(IndexPage)

