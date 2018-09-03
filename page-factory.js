module.exports = function(PageClass) {
  return {
    on: function(PageClass, cb) {
      let pc = new PageClass(this.driver)
      return cb(pc)
    },
    visit: async function(PageClass, cb) {
      let pc = new PageClass(this.driver)
      await pc.visit()
      return cb(pc)
    }
  }
}
