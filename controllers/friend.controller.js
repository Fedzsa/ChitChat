const { Friend } = require('../models/index');
const sequelize = require('../models/index').sequelize;

exports.storeFriendRequest = async (req, res, next) => {
    await Friend.create({
        userId: req.user.id,
        friendId: req.body.userId,
        status: 0
    });

    res.sendStatus(201);
};

exports.acceptFriendRequest = async (req, res, next) => {
    let { userId } = req.body;
    let transaction = await sequelize.transaction();

    try {
        await Friend.update({
            status: 1
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
            status: 1
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