const table = 'user'

module.exports = function (injectedStore) {
  let store = injectedStore

  if (!store) {
    store = require('../../../store/dummy')
  }

  function list() {
    return store.list(table)
  }

  function get(id) {
    return store.get(table, id)
  }

  function upsert(data) {
    return store.upsert(table, data)
  }

  function remove(id) {
    return store.remove(table, id)
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}