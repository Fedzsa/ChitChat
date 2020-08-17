const { Friend } = require('../models/index');

exports.storeFriendRequest = async (req, res, next) => {
    await Friend.create({
        userId: req.user.id,
        friendId: req.body.userId,
        status: 0
    });

    res.sendStatus(201);
};

exports.acceptFriendRequest = async (req, res, next) => {

};