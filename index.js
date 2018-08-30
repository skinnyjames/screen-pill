const Elements = require('./lib/elements')

module.exports = function(driver) {

  return function(PageClass) {

    function Use(key, mixin, scope) {
      for (var func in mixin) {
        self[key][func] = mixin[func].bind(scope) 
      }
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

    this.button = function PageObject$button (key, identifier) {
      self[key] = driver.findElement(identifier)
    }
    

    this.div = function PageObject$div (key, identifier) {

      // more specific identifier
      identifier['tagName'] = 'div'

      self[key] = {
        get: function() {
          return this.element().getText()
        },
      }

      Object.assign(this, { driver, identifier })
      Use(key, Elements, this)

    }

    this.textField = function PageObject$textField (key, identifier) {

      self[key] = {
        set: function(value) {
          return this.element().sendKeys(value)
        },
        get: function() {
          return this.element().getAttribute('value')
        },
      }

      Object.assign(this, { driver, identifier })
      Use(key, Elements, this)
    }
  }
}
