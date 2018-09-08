import * as Bluebird from 'bluebird'
const Element = require('./element')

type Constructor<T = {}> = new (...args: any[]) => T;

interface ScreenPill {
  [index: string]: Function | object,

  driver: object,
  directUrl: Function,
  visit: Function,

  element: Function,
  div: Function,
  textField: Function,
  selectList: Function,
  submit: Function
}


interface BasicLocator {
  index?: number,
  css?: string
}

interface ParsedLocator {
  locator: object,
  index: number
}

export = function ScreenPill<TBase extends Constructor>(Base: TBase) {
  
  return class extends Base implements ScreenPill{

    [key: string]: Function | any

    public url:string
    driver:any 

    setDriver(driver: any) {
      this.driver = driver
    }
  
    directUrl(url: string) {
      this.url = url
    }

    visit(url: string | null) {
      if (url) {
        return this.driver.get(url)
      } else {
        return this.driver.get(this.url)
      }
    }

    element(key:string, elementName:string, locator:BasicLocator = {}) {

      let element = this.initializeElement(elementName, locator)
      this.standardMethods(element)
      this[key] = element
    }

    div(key:string, locator:BasicLocator = {}) {

      let element:any = this.initializeElement('div', locator)
      element = this.standardMethods(element)

      element.get = async function() {
        let el = await this.element()
        return el.getText()
      }

      this[key] = element
    }

    /* 
     * Form Elements
     */
    textField(key:string, locator:BasicLocator = {}) {

      let element:any = this.initializeElement('input[type=text]', locator)
      element = this.standardMethods(element)

      element.get = async function() {
        let el = await this.element()
        return el.getAttribute('value')
      }

      element.set = async function(value:any) {
        let el = await this.element()
        return el.sendKeys(value)
      }

      this[key] = element
    }

    passwordField(key:string, locator:BasicLocator = {}) {

      let element:any = this.initializeElement('input[type=password]', locator)
      element = this.standardMethods(element)

      element.get = async function() {
        let el = await this.element()
        return el.getAttribute('value')
      }

      element.set = async function(value:any) {
        let el = await this.element()
        return el.sendKeys(value)
      }

      this[key] = element
    }


    textarea(key:string, locator:BasicLocator = {}) {

      let element:any = this.initializeElement('textarea', locator)
      element = this.standardMethods(element)

      element.get = async function() {
        let el = await this.element()
        return el.getAttribute('value')
      }

      element.set = async function(value:any) {
        let el = await this.element()
        await el.click()
        await el.clear()
        return el.sendKeys(value)
      }

      this[key] = element
    }


    checkbox(key:string, locator:BasicLocator = {}) {

      let element:any = this.initializeElement('input[type=checkbox]', locator)
      element = this.standardMethods(element)

      element.check = async function() {
        let el = await this.element()
        return el.click()
      }

      element.isChecked = async function() {
        let el = await this.element()
        return el.isSelected()
      }

      this[key] = element
    }

    submit(key:string, locator:BasicLocator = {}) {

      let element:any = this.initializeElement('div', locator)
      element = this.standardMethods(element)

      element.click = async function() {
        let el = await this.element()
        return el.click()
      }

      this[key] = element
    }

    selectList(key:string, locator:BasicLocator = {}) {

      let element:any = this.initializeElement('div', locator)
      element = this.standardMethods(element)

      element.optionElements = async function() {
        let el = await this.element()
        return el.findElements({css: 'option'})
      }

      element.options = async function() {
        let options = await this.optionElements()
        return Bluebird.map(options, (option:any) => {
          return option.getText()
        })
      }

      element.getSelected = async function() {
        let options = await this.optionElements()
        let selected = Bluebird.filter(options, (option:any) => {
          return option.isSelected()
        })
        return Bluebird.map(selected, (el:any) => {
          return el.getText()
        })
      }

      element.get = async function() {
        let selected = await this.getSelected()
        return selected[0]
      }

      element.select = async function(value:any) {
        return this.selectBy('text', value)
      }

      element.selectBy = async function(type = 'index', token:string | number) {
        let options = await this.optionElements()

        switch(type) {
          case 'index': 
            return options[token].click()
            break
          case 'value': 
            for (let i=0;i<options.length;i++) {
              options[i].getAttribute('value')
                .then((value:string) => {
                  if (value == token) {
                    options[i].click()
                  }
                })
            }
            break
          default: 
            for (let i=0;i<options.length;i++) {
              options[i].getText()
                .then((text:string) => {
                  if (text == token) {
                    options[i].click()
                  }
                })
            }
        }
      }

      this[key] = element
    }

    private standardMethods(element:object) {
      return Object.assign(element, Element)
    }

    private initializeElement(elementName:string, locator:BasicLocator) {

      let parsedLocator:ParsedLocator = this.parseLocator(elementName, locator)

      let element = { 
        driver: this.driver, 
        locator: parsedLocator.locator,
        index: parsedLocator.index
      }

      return element

    }

    private parseLocator(elementName:string, locator:BasicLocator) {

      let index:number

      // specific css selector
      if (locator.css) {
        locator.css = elementName + locator.css
      } else {
        locator.css = elementName
      }

      // parse out index
      if (locator.index != null) {
        index = locator.index
        delete locator.index
      } else {
        index = 0
      }

      return { locator: locator, index: index }
    }

  }
}


