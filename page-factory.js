module.exports = {
  on: function(PageClass, cb) {
    let pc = new PageClass(this.driver)
    if (cb && typeof cb == 'function') {
      return cb(pc)
    } else {
      return pc
    }
  },
  visit: async function(PageClass, cb) {
    let pc = new PageClass(this.driver)
    await pc.visit()
    if (cb && typeof cb == 'function') {
      return cb(pc)
    } else {
      return pc
    }
  }
}
