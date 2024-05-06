const db = {
  'user': [
    {
      id: crypto.randomUUID(),
      name: 'Jhon',
      username: 'jhon26'
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
  if(!db[table]) {
    db[table] = []
  }

  db[table].push(data)
  console.log(db)
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