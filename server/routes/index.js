const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/seed', controller.seeders)
router.get('/users', controller.getUsers)
router.get('/user/:id', controller.getOneUser)
router.post('/user', controller.createUser)
router.put('/user/:id', controller.updateUser)
router.delete('/user/:id', controller.deleteUser)

module.exports = router
