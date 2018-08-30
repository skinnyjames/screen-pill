module.exports = {
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
