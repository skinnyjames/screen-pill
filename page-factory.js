module.exports = function(PageClass) {
  return {
    on: function(PageClass, cb) {
      let pc = new PageClass(this.driver)
      if (cb && typeof cb == 'function') {
        return cb(pc)
      }
    },
    visit: async function(PageClass, cb) {
      let pc = new PageClass(this.driver)
      await pc.visit()
      if (cb && typeof cb == 'function') {
        return cb(pc)
      }
    }
  }
}
