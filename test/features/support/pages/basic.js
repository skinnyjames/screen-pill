const ScreenPill = require('./../../../../dist/screen-pill.js')

function BasicPage(driver) {

  this.setDriver(driver)
  this.directUrl('http://localhost:8080/basic.html')

  this.h1('h1Element')
  this.h2('h2Element')
  this.h3('h3Element')
  this.h4('h4Element')
  this.h5('h5Element')
  this.h6('h6Element')

  this.div('divElement')
  this.span('spanElement')
  this.em('emElement')
  this.strong('strongElement')
  this.ul('ulElement')
  this.li('ulLiElement', {css: '.ul'})
  this.ol('olElement')
  this.li('olLiElement', {css: '.ol'})
  this.table('tableElement')
  this.tr('trElement')
  this.td('tdElement')

  this.image('img')
  this.link('a')

}

module.exports = ScreenPill(BasicPage)
