const express = require('express');
const { RegisterControll, LoginControl, User, ClearCookies, updateUser, UserById, Subscribed } = require('../controller/auth.controller');

const router = express.Router()

const auth = require('../middleware/auth.middleware')

router.post('/register', RegisterControll)
router.post('/login', LoginControl)
router.get('/clear-cookies', ClearCookies)

router.get('/user', auth, User)
router.get('/subscribed/:id', Subscribed)
router.get('/user/:id', UserById)
router.put('/update-user/:id', updateUser)

module.exports = router