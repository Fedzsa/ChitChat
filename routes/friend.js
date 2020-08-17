const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const FriendController = require('../controllers/friend.controller');

router.post('/request', auth, FriendController.storeFriendRequest);

module.exports = router;