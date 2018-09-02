module.exports = {
  element: function() { 
    let index = this.index
    let driver = this.driver
    return this.driver.findElements(this.identifier)
    .then((elements) => { 
      if(!elements[index]) {
        return Promise.reject("No such element at index: " + index + " with " + JSON.stringify(this.identifier))
      }
      return Promise.resolve(elements[index])
    })
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

      let identifier = this.identifier
      let index = this.index

      return this.driver.findElements(identifier).then(success, error)

      function success(elements) {
        if (elements[index]) { 
          return elements[index].isDisplayed()
        }else{ 
          return Promise.resolve(false)
        }
      }

      function error(err) {
        return Promise.resolve(false)
      }
    }, timeout, JSON.stringify(this.identifier))
  }
}
