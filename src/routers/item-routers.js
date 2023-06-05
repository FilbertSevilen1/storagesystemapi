const routers = require('express').Router()

const {item} = require('../controllers')

routers.post('/', item.getAllItems)
routers.post('/insert', item.insertItem)
routers.post('/add', item.addItemToBorrow)
routers.post('/draft', item.getDraft)
routers.post('/cancel', item.cancelDraft)
routers.post('/remove', item.removeItemFromBorrow)
routers.post('/updateDraft', item.updateDraft)
routers.post('/borrow', item.submitDraft)

module.exports = routers