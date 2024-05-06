const express = require('express')
const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')

const app = express()

app.use(express.json())

app.use('/api/user', user)
app.use('/api/auth', auth)

// Routes
app.listen(config.api.port, () => {
  console.log(`API listening on port ${config.api.port}`)
})