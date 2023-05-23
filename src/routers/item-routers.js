const routers = require('express').Router()

const {item} = require('../controllers')

routers.post('/', item.getAllItems)

module.exports = routers