const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/seed', controller.seeders)
router.get('/users', controller.getUsers)
router.get('/user/:username', controller.getOneUser)
router.post('/user', controller.createUser)
router.put('/user/:username', controller.updateUser)
router.delete('/user/:username', controller.deleteUser)

router.get('/:username/skills', controller.getSkills)
router.put('/:username/skill', controller.addSkill)

module.exports = router
