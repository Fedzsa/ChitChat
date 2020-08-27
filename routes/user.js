const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');

router.get('/unknown', auth, UserController.getUnknownUsers);

module.exports = router;