module.exports = function(driver) {

  var Elements = { 
    element: function() { 
      return this.driver.findElement(this.identifier) 
    },
    waitUntil: function(cb, timeout=5000, message='wait condition not met') {
      let element = this.driver.findElement(this.identifier)
      let condition = function() {
        return cb(element)
      }
      return this.driver.wait(condition, timeout, message)
    },
    waitUntilPresent: function(timeout=5000, message='element not present') {
      return this.driver.wait(() => {
        return this.driver.findElement(this.identifier).then(success, error)

        function success(element) {
          return true
        }

        function error(err) {
          return false
        }
      }, timeout, message)
    }
  }

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
