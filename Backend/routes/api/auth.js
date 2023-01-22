const express = require("express");
const authController = require("../../controllers/authController.js");

const router = express.Router();

router.route('/').post(authController.register)
/* router.post('/login', authController.login);
router.get('/logout', authController.logout); */

module.exports = router;