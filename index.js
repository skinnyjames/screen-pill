const Elements = require('./lib/elements')

module.exports = function(driver) {

  return function(PageClass) {

    function Use(key, mixin) {
      Object.assign(self[key], mixin)
    }

    function parseIdentifier(identifier, elementName, scope) {
      if (identifier['css']) {
        identifier['css'] = elementName + identifier['css']
      } else {
        identifier['css'] = elementName
      }

      if (identifier['index'] != null) {
        scope['index'] = identifier['index']
        delete identifier['index']
      } else {
        scope['index'] = 0
      }

      return identifier
    }

    PageClass.prototype = this

    const self = this

    this.driver = driver

    this.url = function PageObject$url (url) {
      self.url = url
    }

    this.visit = function PageObject$visit (url) {
      if (url) {
        return driver.get(url)
      } else {
        return driver.get(self.url)
      }
    }


    this.div = function PageObject$div (key, identifier={}) {
      self[key] = {
        get: function() {
          return this.element().then((element) => { return element.getText() })
        },
      }

      indentifier = parseIdentifier(identifier, 'div', self[key])
      Object.assign(self[key],  { driver, identifier })
      Use(key, Elements)
    }

    this.textField = function PageObject$textField (key, identifier={}) {


      self[key] = {
        set: function(value) {
          return this.element().then((element) => { return element.sendKeys(value) })
        },
        get: function() {
          return this.element().then((element) => { return element.getAttribute('value') })
        },
      }
      indentifier = parseIdentifier(identifier, 'input[type=text]', self[key])
      Object.assign(self[key], { driver, identifier })
      Use(key, Elements)
    }

    this.submit = function PageObject$submit (key, identifier={}) {
      self[key] = {
        click: function() {
          return this.element().then((element) => { return element.click() })
        }
      }
      indentifier = parseIdentifier(identifier, 'input[type=submit]', self[key])
      Object.assign(self[key], { driver, identifier })
      Use(key, Elements)
    }
  }
}
