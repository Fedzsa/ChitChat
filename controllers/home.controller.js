const { User, Friend } = require('../models/index');

exports.index = async (req, res, next) => {
    let friends = await req.user.getFriends();

    res.render('index', {
        friends: friends
    });
};