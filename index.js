const Elements = require('./lib/elements')
const Promise = require('bluebird')

module.exports = function(driver) {

  return function(PageClass) {

    function include(key, mixin) {
      Object.assign(self[key], mixin)
    }

    function parseIdentifier(identifier, elementName, scope) {
      if (identifier['css'] && elementName != null) {
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

    this.element = function PageObject$element (key, identifier={}) {
      self[key] = {} 
      indentifier = parseIdentifier(identifier, null, self[key])
      Object.assign(self[key],  { driver, identifier })
      Object.assign(self[key], Elements)
    }

    this.div = function PageObject$div (key, identifier={}) {
      self[key] = {
        get: function() {
          return this.element().then((element) => { return element.getText() })
        },
      }

      indentifier = parseIdentifier(identifier, 'div', self[key])
      Object.assign(self[key],  { driver, identifier })
      Object.assign(self[key], Elements)
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
      Object.assign(self[key], Elements)
    }

    this.selectList = function PageObject$selectList (key, identifier={}) {
      self[key] = {
        get: function() {
          let selected = Promise.filter(this.optionElements(), (element) => {
            return element.isSelected()
          })
          return Promise.map(selected, (el) => {
            return el.getText()
          })
        },
        optionElements: function() {
          return this.element()
          .then((element) => { 
            return element.findElements({css: 'option'})
          })
          .then((elements) => {
            return Promise.all(elements)
          })
        },
        options: function() {
          return this.optionElements()
          .then(options => { 
            return Promise.map(options, (option) => {
              return option.getText()
            })
          })
        },
        select: function(value) {
          return this.selectBy('visibleText', value)
        },
        selectBy: function(type='visibleText', token) {
          return this.optionElements()
          .then((options) => {
            switch(type) {
              case 'index': 
                return options[token].click()
                break
              case 'value': 
                for (let i=0;i<options.length;i++) {
                  options[i].getAttribute('value')
                  .then((value) => {
                    if (value == token) {
                      return options[i].click()
                    }
                  })
                }
                break;
              case 'visibleText':
                for (let i=0;i<options.length;i++) {
                  options[i].getText()
                  .then((value) => {
                    if (value == token) {
                      return options[i].click()
                    }
                  })
                }
                break
              default: 
                return options[0].click()
            }
          })
        }
      }
      indentifier = parseIdentifier(identifier, 'input[type=text]', self[key])
      Object.assign(self[key], { driver, identifier })
      Object.assign(self[key], Elements)
    }

    this.submit = function PageObject$submit (key, identifier={}) {
      self[key] = {
        click: function() {
          return this.element().then((element) => { return element.click() })
        }
      }
      indentifier = parseIdentifier(identifier, 'input[type=submit]', self[key])
      Object.assign(self[key], { driver, identifier })
      Object.assign(self[key], Elements)
    }
  }
}
