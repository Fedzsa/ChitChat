const friendList = document.querySelector('#friend-list');

let firendListItems = Array.from(friendList.children);
firendListItems.forEach(element => {
    if(element.hasAttribute('data-room-id')) {
        element.addEventListener('click', event => {
            window.location.href = `/chats/${event.target.dataset.roomId}`;
        });
    }
});