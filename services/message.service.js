const { User, Message, Room } = require('../models/index');

exports.saveMessage = async (message, userId, roomId) => {
    await Message.create({
        message: message,
        userId: userId,
        roomId: roomId
    });
};

exports.getRoomMessages = async (roomId) => {
    return await Message.findAll({
        where: {
            roomId: roomId
        },
        order: [['createdAt', 'ASC']],
        limit: 20
    });
};