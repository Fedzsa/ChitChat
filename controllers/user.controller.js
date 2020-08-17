const { User } = require('../models/index');
const { Op } = require("sequelize");

exports.getUnknownUsers = async (req, res, next) => {
    let friends = await req.user.getFriends();
    
    let users = await User.findAll({
        where: {
            username: {
                [Op.not]: req.user.username,
                [Op.notIn]: friends.map(user => user.username),
                [Op.substring]: req.query.search
            }
        }
    });

    res.status(200).json(users);
};