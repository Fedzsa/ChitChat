const { User, Friend, Message, Room, sequelize } = require('../models/index');
const { Op } = require("sequelize");
const friendStatus = require('../helper/friendStatuses');
const FriendService = require('../services/friend.service');
const RoomService = require('../services/room.service');
const moment = require('moment');

exports.index = async (req, res, next) => {
    let friends = await FriendService.getUserFriends(req.user.id);
    let friendRequests = await FriendService.getUserFriendRequests(req.user.id);
    let rooms = await RoomService.getUserRoomsWithMessageDetails(req.user.id);

    res.render('index', {
        friends: friends,
        friendRequests: friendRequests,
        rooms: rooms,
        moment: moment
    });
};