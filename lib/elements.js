module.exports = {
  element: async function() { 
    let index = this.index
    let driver = this.driver
    let elements = await this.driver.findElements(this.identifier)
    if(!elements[index]) {
      return Promise.reject("No such element at index: " + index + " with " + JSON.stringify(this.identifier))
    }
    return Promise.resolve(elements[index])
  },
  waitUntil: async function(cb, timeout=5000, message='wait condition not met') {
    let driver = this.driver
    let element = await this.element()
    let condition = function() {
      return cb(el)
    }
    return driver.wait(condition, timeout, message)
  },
  waitUntilPresent: function(timeout=5000, message='element not present') {
    return this.driver.wait(() => {

      let identifier = this.identifier
      let index = this.index

      return this.driver.findElements(identifier).then(success, error)

      async function success(elements) {
        if (elements[index]) { 
          let element = await elements[index]
          let displayed = await element.isDisplayed()
          return displayed 
        }else{ 
          return Promise.resolve(false)
        }
      }

      async function error(err) {
        return Promise.resolve(false)
      }
    }, timeout, message)
  }
}
