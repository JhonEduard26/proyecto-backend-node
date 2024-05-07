const table = 'user'
const auth = require('../auth')

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

  async function upsert(body) {
    const newUser = {
      name: body.name,
      username: body.username
    }

    if (body.id) {
      newUser.id = body.id
    } else {
      newUser.id = crypto.randomUUID()
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: newUser.id,
        username: body.username,
        password: body.password
      })
    }

    return store.upsert(table, newUser)
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