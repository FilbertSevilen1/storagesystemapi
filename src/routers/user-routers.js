const routers = require('express').Router()

const multer = require('multer')
//multer storage

var rankstorage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'public/users') //letak folder disimpen
  },
  filename: function (req, file, cb) {
    cb(null, 'IMG-' + Date.now() + '.jpg') //Appending .jpg
  }
})

var uploadrank = multer({ storage: rankstorage, limits : 10000000});

const {user} = require('../controllers')

routers.get('/', user.getAllUsers)
routers.post('/id', user.getUserById)
routers.post('/register', user.registerUser)
routers.post('/login', user.loginUser)
routers.post('/keeplogin', user.keepLogin)

module.exports = routers