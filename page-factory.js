module.exports = function(PageClass) {
  return {
    on: function(PageClass, cb) {
      let pc = PageClass.new(this.driver)
      return cb(pc)
    },
    visit: async function(PageClass, cb) {
      let pc = PageClass.new(this.driver)
      await pc.visit()
      return cb(pc)
    }
  }
}
