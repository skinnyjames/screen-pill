module.exports = function(driver) {

  return function(PageClass) {

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
        element: function() {
          return driver.findElement(identifier)
        },
        waitUntil: function(cb, timeout=5000, message='wait condition not met') {
          let element = this.element() 
          let condition = function() {
            return cb(element)
          }
          return driver.wait(condition, timeout, message)
        },
        waitUntilPresent: function(timeout=5000, message='element not present') {
          return driver.wait(() => {
            return driver.findElement(identifier).then(success, error)

            function success(element) {
              return true
            }

            function error(err) {
              return false
            }
          }, timeout, message)
        }
      }
    }

    this.textField = function PageObject$textField (key, identifier) {
      self[key] = {
        set: function(value) {
          return this.element().sendKeys(value)
        },
        get: function() {
          return this.element().getAttribute('value')
        },
        element: function() {
          return driver.findElement(identifier)
        },
        waitUntil: function(cb, timeout=5000, message='wait condition not met') {
          let element = this.element() 
          let condition = function() {
            return cb(element)
          }
          return driver.wait(condition, timeout, message)
        },
        waitUntilPresent: function(timeout=5000, message='element not present') {
          return driver.wait(() => {
            return driver.findElement(identifier).then(success, error)

            function success(element) {
              return true
            }

            function error(err) {
              return false
            }
          }, timeout, message)
        }
      }
    }
  }
}
