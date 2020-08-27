const { User, Friend } = require('../models/index');
const sequelize = require('../models/index').sequelize;
const friendStatus = require('../helper/friendStatuses');
const { Op } = require("sequelize");
const RoomService = require('../services/room.service');
const FriendServices = require('../services/friend.service');

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

    try {
        await FriendServices.acceptFriendRequest(require.user.id, userId);
        await RoomService.createPrivateRoom(req.user.id, userId);
    } catch(error) {
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