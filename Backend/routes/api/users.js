const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .put(usersController.updateUser)

router.route('/register')
    .post(usersController.register)

router.route('/login')
    .get(usersController.login)

router.route('/:id')
    .get(usersController.getUser)
    .delete(usersController.deleteUser)

module.exports = router