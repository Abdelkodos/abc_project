const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')


router.route('/login')
    .get(usersController.login)

    module.exports = router