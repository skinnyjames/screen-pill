const ScreenPill = require('./../../../../dist/screen-pill.js')

function AsyncPage(driver) {

  this.setDriver(driver)
  this.directUrl('http://localhost:8080/async.html')
  this.element('hello', 'div#container span')

}

module.exports = ScreenPill(AsyncPage)
