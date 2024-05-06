const db = {
  'user': [
    {
      id: crypto.randomUUID(),
      name: 'Jhon'
    }
  ]
}

async function get(table, id) {
  let col = await list(table)
  return col.find(item => item.id === id) || null
}

async function list(table) {
  return db[table]
}

async function upsert(table, data) {
  const newUser = {
    id: crypto.randomUUID(),
    name: data.name  
  }

  db[table].push(newUser)
}

async function remove(table, id) {
  const user = await get(table, id)

  if (!user) {
    throw new Error('User not found')
  }

  db[table] = db[table].filter(item => item.id !== id)
}

module.exports = {
  get,
  list,
  upsert,
  remove
}