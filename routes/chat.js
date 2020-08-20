const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const ChatController = require('../controllers/chat.controller');

router.get('/:id', auth, ChatController.index);

module.exports = router;