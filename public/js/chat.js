const socketIO = io();
const chat = document.getElementById('chat');
const chatWindow = document.getElementById('chat-window');
const chatTextarea = document.getElementById('chat-textarea');

socketIO.emit('chat room', chat.dataset.roomId);

socketIO.on('chat message', (data) => {
    chatWindow.appendChild(createMessageBoxForPartner(data.message));
});


chatTextarea.addEventListener('keyup', (event) => {
    if(event.which === 13 && event.target.value !== '') {
        socketIO.emit('chat message', {
            roomId: chat.dataset.roomId,
            message: event.target.value
        });

        chatWindow.appendChild(createMessageBoxForCurrentUser(event.target.value));
        
        event.target.value = '';
    }
});

function createMessageBoxForCurrentUser(text) {
    let messageBox = createMessageBox(text);
    messageBox.classList.add('bg-success');
    messageBox.classList.add('float-right');
    return messageBox;
}

function createMessageBoxForPartner(text) {
    let messageBox = createMessageBox(text);
    messageBox.classList.add('bg-primary');
    messageBox.classList.add('float-left');
    return messageBox;
}

function createMessageBox(text) {
    let messageBox = document.createElement('div');
    messageBox.classList.add('message');
    messageBox.innerHTML = text;
    return messageBox;
}