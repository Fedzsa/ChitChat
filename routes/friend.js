const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const FriendController = require('../controllers/friend.controller');

router.post('/request', auth, FriendController.storeFriendRequest);
router.post('/request/accept', auth, FriendController.acceptFriendRequest)

module.exports = router;