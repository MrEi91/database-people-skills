const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.get('/users', controller.getUsers)
// router.post('/user', controller.addTodo)
// router.put('/user/:id', controller.editTodo)
// router.delete('/user/:id', controller.removeTodo)

module.exports = router
