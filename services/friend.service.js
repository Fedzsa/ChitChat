const { User, Friend } = require('../models/index');
const friendStatus = require('../helper/friendStatuses');
const { Op } = require("sequelize");

exports.acceptFriendRequest = async (who, whom) => {
    let transaction = await sequelize.transaction();

    try {
        await Friend.update({
            status: friendStatus.ACCEPTED
        },
        {
            where: {
                userId: whom,
                friendId: who
            }
        },
        {
            transaction: transaction
        });

        await Friend.create({
            userId: who,
            friendId: whom,
            status: friendStatus.ACCEPTED
        },
        {
            transaction: transaction
        });

        await transaction.commit();
    } catch(error) {
        await transaction.rollback();

        throw new Error('Friend request not accepted');
    }
};

exports.getUserFriends = async (userId, search = '') => {
    return await User.findAll({
        include: {
            model: Friend, 
            as: 'Friend',
            where: {
                userId: userId,
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
};

exports.getUserFriendRequests = async (userId) => {
    return await User.findAll({
        include: {
            model: Friend, 
            as: 'Me', 
            where: {
                friendId: userId,
                status: friendStatus.PENDING
            },
            attributes: []
        }
    });
};