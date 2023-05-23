const routers = require('express').Router()

const {storage} = require('../controllers')

routers.get('/', storage.getAllStorages)

module.exports = routers