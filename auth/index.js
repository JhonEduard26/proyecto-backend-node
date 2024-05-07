const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.jwt.secret
const error = require('../utils/error')

function sign(data) {
  return jwt.sign(data, secret)
}

function verify(token) {
  return jwt.verify(token, secret)
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req)
    console.log({ decoded })
    console.log({ owner })

    if (decoded.id !== owner) {
      throw error('You can\'t do this', 401)
    }

    return true
  }
}

function getToken(auth) {
  if (!auth) {
    throw error('Token is not present', 401)
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 400)
  }

  let token = auth.replace('Bearer ', '')
  return token
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)

  const decoded = verify(token)

  req.user = decoded

  return decoded
}

module.exports = {
  sign,
  check
}