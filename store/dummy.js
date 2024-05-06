const db = {
  'user': []
}

async function get(table, id) {
  let col = await list(table)
  return col.find(item => item.id === id)[0] || null
}

async function list(table) {
  return db[table] || []
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = []
  }

  db[table].push(data)
}

async function remove(table, id) {
  const user = await get(table, id)

  if (!user) {
    throw new Error('User not found')
  }

  db[table] = db[table].filter(item => item.id !== id)
}

async function query(table, q) {
  let col = await list(table)
  let keys = Object.keys(q)
  let key = keys[0]

  return col.filter(item => item[key] === q[key])[0] || null
}

module.exports = {
  get,
  list,
  upsert,
  remove,
  query
}