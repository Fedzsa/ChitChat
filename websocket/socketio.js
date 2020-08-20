const socketIO = require('socket.io');
const { User, Message } = require('../models/index');
const MessageService = require('../services/message.service');
const RoomService = require('../services/room.service');

module.exports.listen = (server, { sessionMiddleware }) => {
    const io = socketIO.listen(server);

    io.use((socket, next) => sessionMiddleware(socket.request, {}, next));

    io.use(async (socket, next) => {
        if(socket.request.session.passport) {
            socket.request.user = await User.findByPk(socket.request.session.passport.user);

            next();
        } else {
            throw new Error('Unauthenticated');
        }
    });

    // Setup Socket.IO
    io.on('connection', async (socket) => {
        console.log(`New client connected with ID ${socket.id}`);
        
        socket.on('chat room', room => {
            console.log(`Client join the ID ${room} room`)
            socket.join(room);
        });

        socket.on('chat message', async data => {
            await MessageService.saveMessage(data.message, socket.request.user.id, data.roomId);

            socket.to(data.roomId).emit('chat message', data);
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected with ID ${socket.id}`);
        })
    });
};