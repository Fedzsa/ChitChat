const { User, Friend } = require('../models/index');
const friendStatus = require('../helper/friendStatuses');
const FriendService = require('../services/friend.service');
const MessageService = require('../services/message.service');
const RoomService = require('../services/room.service');

exports.index = async (req, res, next) => {
    let friends = await FriendService.getUserFriends(req.user.id);
    let friendRequests = await FriendService.getUserFriendRequests(req.user.id);
    let messages = await MessageService.getRoomMessages(req.params.id);
    let room = await RoomService.getRoomWithUsers(req.params.id, req.user);

    res.render('conversation', {
        friends: friends,
        friendRequests: friendRequests,
        room: room,
        messages: messages
    });
};