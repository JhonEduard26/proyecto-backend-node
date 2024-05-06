const express = require('express')
const config = require('../config')
const user = require('./components/user/network')

const app = express()

app.use('/api/user', user)

// Routes
app.listen(config.api.port, () => {
  console.log(`API listening on port ${config.api.port}`)
})