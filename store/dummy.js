const db = {
  'user': [
    {
      id: 1,
      name: 'Jhon'
    }
  ]
}

function get(table, id) {
  let col = list(table)
  return col.find(item => item.id === id) || null
}

function list(table) {
  return db[table]
}

function upsert(table, data) {
  db[collection].push(data)
}

function remove(table, id) {
  return true
}

module.exports = {
  get,
  list,
  upsert,
  remove
}