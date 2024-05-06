const table = 'auth'
const auth = require('../../../auth')

module.exports = function (injectedStore) {
  let store = injectedStore

  if (!store) {
    store = require('../../../store/dummy')
  }

  async function login(username, password) {
    const data = await store.query(table, { username })

    if (data.password === password) {
      delete data.password
      return auth.sign(data)
    } else {
      throw new Error('Credenciales inválidos')
    }
  }

  function upsert(data) {
    const authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = data.password
    }

    return store.upsert(table, authData)
  }

  return {
    upsert,
    login
  }
}
