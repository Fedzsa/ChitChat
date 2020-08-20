const { User, Room, Message } = require('../models/index');
const sequelize = require('../models/index').sequelize;
const roomTypes = require('../helper/roomTypes');
const { Op } = require("sequelize");

exports.createPrivateRoom = async (who, whom) => {
    let transaction = await sequelize.transaction();

    try {
        let room = await Room.create({
            name: '',
            type: roomTypes.PRIVATE
        },
        {
            transaction: transaction
        });

        await UsersRooms.create({
            userId: who,
            roomId: room.id
        },
        {
            transaction: transaction
        });

        await UsersRooms.create({
            userId: whom,
            roomId: room.id
        },
        {
            transaction: transaction
        });

        await transaction.commit();
    } catch(error) {
        await transaction.rollback();
        throw new Error('Room is not created');
    }
};

exports.getRoomWithUsers = async (roomId, withoutCurrentUser = null) => {
    let whereCondition = {};

    if(withoutCurrentUser !== null) {
        whereCondition['$Users.id$'] = {
            [Op.not]: withoutCurrentUser.id
        };
    }
    
    return await Room.findByPk(roomId, {
        include: {
            model: User,
            where: whereCondition
        }
    });
};

exports.getUserRoomsWithMessageDetails = async (userId) => {
    let user = await User.findByPk(userId, {
        attributes: [],
        include: {
            model: Room,
            include: [
                {
                    model: Message,
                    attributes: ['id', 'message', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['id', 'username']
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 1
                },
                {
                    model: User,
                    where: {
                        id: {
                            [Op.not]: userId
                        }
                    }
                }
            ]
        }
    });

    return user.Rooms;
};