export = {
  element: async function() { 
    let index = this.index
    let driver = this.driver
    let elements = await this.driver.findElements(this.locator)
    if(!elements[index]) {
      return Promise.reject("No such element at index: " + index + " with " + JSON.stringify(this.locator))
    }
    return Promise.resolve(elements[index])
  },

  waitUntil: async function(cb:Function, timeout=5000, message='wait condition not met') {
    let driver = this.driver
    let element = await this.element()
    let condition = function() {
      return cb(element)
    }
    return driver.wait(condition, timeout, message)
  },

  waitUntilPresent: function(timeout=5000, message='element not present') {
    let driver = this.driver

    return this.driver.wait(() => {

      let locator = this.locator
      let index = this.index

      return driver.findElements(locator).then(success, error)

      async function success(elements:any) {
        if (elements[index]) { 
          let element = await elements[index]
          let displayed = await element.isDisplayed()
          return displayed 
        }else{ 
          return Promise.resolve(false)
        }
      }

      async function error(err:any) {
        return Promise.resolve(false)
      }
    }, timeout, message)
  }
}
