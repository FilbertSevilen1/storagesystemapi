const routers = require('express').Router()

const {item} = require('../controllers')

routers.post('/', item.getAllItems)
routers.post('/insert', item.insertItem)

module.exports = routers