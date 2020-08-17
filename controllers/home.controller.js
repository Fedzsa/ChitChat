const { User, Friend } = require('../models/index');
const { Op } = require("sequelize");

exports.index = async (req, res, next) => {
    let friends = await User.findAll({
        include: {
            model: Friend, 
            as: 'Me',
            where: {
                userId: req.user.id,
                status: 1
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
                status: 0
            },
            attributes: []
        }
    });

    res.render('index', {
        friends: friends,
        friendRequests: friendRequests
    });
};