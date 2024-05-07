const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.get('/:id', get)
router.get('/', list)
router.post('/', upsert)
router.put('/', secure('update'), upsert)
router.delete('/:id', remove)

function list(req, res) {
  Controller.list()
    .then((list) => {
      response.success(req, res, list, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

function get(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      console.log(user)
      response.success(req, res, user, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

function upsert(req, res) {
  Controller.upsert(req.body)
    .then(() => {
      response.success(req, res, 'User created', 201)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

function remove(req, res) {
  Controller.remove(req.params.id)
    .then(() => {
      response.success(req, res, `User ${req.params.id} deleted`, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

module.exports = router