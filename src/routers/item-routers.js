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
routers.post('/borrowing', item.getBorrowingByUserID)
routers.post('/ongoing', item.getOngoing)
routers.post('/returnitems', item.returnItems)

module.exports = routers