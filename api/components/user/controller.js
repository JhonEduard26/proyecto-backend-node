const store = require('../../../store/dummy')
const table = 'user'

function list() {
  return store.list(table)
}

module.exports = {
  list
}