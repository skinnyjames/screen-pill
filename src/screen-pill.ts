
Promise = require('bluebird')

type Constructor<T = {}> = new (...args: any[]) => T;

interface PillFactory {
  driver: object,
  on: Function,
  visit: Function
}

function ScreenPill<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
  }
}

function PillFactory<TBase extends Constructor>(Base: TBase) {

  return class extends Base implements PillFactory {

    constructor(...args: any[]) {
      super()
    }

    driver:any = this.driver

    on(PageClass: any, callback?: Function) {
      
      let screenPill = new PageClass(this.driver)

      if (callback && typeof callback == 'function') {
        return callback(screenPill)
      } else {
        return screenPill
      }
    }

    async visit(PageClass: any, callback?: Function) {

      let screenPill = new PageClass(this.driver)
      await screenPill.visit()


      if (callback && typeof callback == 'function') {
        return callback(screenPill)
      } else {
        return screenPill
      }
    }

  }
}

export {
  ScreenPill,
  PillFactory
};
