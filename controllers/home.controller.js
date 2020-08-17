const { User, Friend } = require('../models/index');
const { Op } = require("sequelize");
const friendStatus = require('../helper/friendStatuses');

exports.index = async (req, res, next) => {
    let friends = await User.findAll({
        include: {
            model: Friend, 
            as: 'Friend',
            where: {
                userId: req.user.id,
                status: friendStatus.ACCEPTED
            },
            attributes: []
        }
    });

    let friendRequests = await User.findAll({
        include: {
            model: Friend, 
            as: 'Me', 
            where: {
                friendId: req.user.id,
                status: friendStatus.PENDING
            },
            attributes: []
        }
    });

    res.render('index', {
        friends: friends,
        friendRequests: friendRequests
    });
};