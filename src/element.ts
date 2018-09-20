interface Options {
  timeout?: number,
  message?: string
}

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

  allElements: async function() {
    return this.driver.findElements(this.locator)
  },

  exists: async function() {

    let locator = this.locator
    let index = this.index
    let driver = this.driver

    return driver.findElements(locator).then(success, error)

    function success(elements: any) {
      if(elements[index]) {
        return true
      } else {
        return false
      }
    }

    function error(err: any) {
      return false
    }
  },

  waitUntil: async function(cb:Function, opts:Options = {}) {

    if (!opts.timeout) {
      opts.timeout = 5000
    }
    if (!opts.message) {
      opts.message = 'wait condition timed out after ' + opts.timeout + ' millseconds'
    }

    let self = this
    let driver = this.driver
    let condition = function() {
      return cb(self)
    }
    return driver.wait(condition, opts.timeout, opts.message)
  },

  waitUntilPresent: function(opts:Options = {}) {
    let driver = this.driver

    if (!opts.timeout) {
      opts.timeout = 5000
    }
    if (!opts.message) {
      opts.message = 'element ' + JSON.stringify(this.locator) + ' at index ' + this.index + ' not present after ' + opts.timeout + ' millseconds'
    }

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
    }, opts.timeout, opts.message)
  }
}
