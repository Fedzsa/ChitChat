const { User, Friend } = require('../models/index');
const sequelize = require('../models/index').sequelize;
const friendStatus = require('../helper/friendStatuses');
const { Op } = require("sequelize");

exports.storeFriendRequest = async (req, res, next) => {
    await Friend.create({
        userId: req.user.id,
        friendId: req.body.userId,
        status: friendStatus.PENDING
    });

    res.sendStatus(201);
};

exports.acceptFriendRequest = async (req, res, next) => {
    let { userId } = req.body;
    let transaction = await sequelize.transaction();

    try {
        await Friend.update({
            status: friendStatus.ACCEPTED
        },
        {
            where: {
                userId: userId,
                friendId: req.user.id
            }
        },
        {
            transaction: transaction
        });

        await Friend.create({
            userId: req.user.id,
            friendId: userId,
            status: friendStatus.ACCEPTED
        },
        {
            transaction: transaction
        });

        await transaction.commit();
    } catch(error) {
        await transaction.rollback();

        return res.sendStatus(500);
    }


    res.sendStatus(200);
};

exports.declineFriendRequest = async (req, res, next) => {
    let { userId } = req.body;

    await Friend.update(
        {
            status: friendStatus.DECLINED
        },
        {
            where: {
                userId: userId,
                friendId: req.user.id
            }
        });

    res.sendStatus(200);
};

exports.getFriends = async (req, res, next) => {
    let { search } = req.query;

    let friends = await User.findAll({
        include: {
            model: Friend, 
            as: 'Friend',
            where: {
                userId: req.user.id,
                status: friendStatus.ACCEPTED
            },
            attributes: []
        },
        where: {
            username: {
                [Op.substring]: search
            }
        }
    });

    res.status(200).json(friends);
};