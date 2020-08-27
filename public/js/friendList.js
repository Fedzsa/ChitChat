//const socketIO = io();

socketIO.emit('online');

const friendList = document.querySelector('#friend-list');
const friendListItems = Array.from(friendList.children);

socketIO.on('online', clients => {
    friendListItems.forEach(value => {
        if(clients.includes(parseFloat(value.getAttribute('data-user-id')))) {            
            value.lastElementChild.classList.remove('status-offline');
            value.lastElementChild.classList.add('status-online');
        } else {
            value.lastElementChild.classList.remove('status-online');
            value.lastElementChild.classList.add('status-offline');
        }
    });
});

friendListItems.forEach(element => {
    if(element.hasAttribute('data-room-id')) {
        element.addEventListener('click', event => {
            window.location.href = `/chats/${event.target.dataset.roomId}`;
        });
    }
});