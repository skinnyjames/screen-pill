const ScreenPill = require('./../../../../dist/screen-pill.js')

function IndexPage(driver) {
  this.setDriver(driver)
  this.directUrl('localhost:8080')

  this.element('stats', 'table#stats tr:nth-child(2) td', { index: 1 })

  this.textField('username', { id: 'username' })
  this.passwordField('password', { id: 'password' })

  this.checkbox('hungry', { id: 'hungry' })
  this.radio('food', { name: 'food' })

  this.label('clickedLabel', { css: "[for=\'clicked\']"})
  this.checkbox('clickedCheckbox', { id: 'clicked' })

  this.file('document', { id: 'document' })

  this.textarea('description', { id: 'description' })
  this.selectList('favoriteColor', { id: 'favorite-color'})
}

module.exports = ScreenPill(IndexPage)

