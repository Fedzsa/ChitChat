const searchNewFriendInput = document.getElementById('search-new-friend-input');
let timeout = null;

searchNewFriendInput.addEventListener('keyup', (event) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        clearUserList();
        if(event.target.value !== '') {
            search(event.target.value);
        }
    }, 500);
});

function search(input) {
    fetch(`/users/unknown?search=${input}`)
    .then(response => response.json())
    .then(data => createUserList(data))
    .catch(error => console.error(error));
}

function clearUserList() {
    document.getElementById('user-list').innerHTML = '';
}

function createUserList(users) {
    let userList = document.getElementById('user-list');

    users.forEach((value) => {
        let li = document.createElement('li');
        li.classList.add('list-item');
        li.innerHTML = value.username;
        li.appendChild(createAddFriendButton(value.id));
        userList.appendChild(li);
    });
}

function createAddFriendButton(userId) {
    let button = document.createElement('button');
    button.setAttribute('data-user-id', userId);
    button.setAttribute('onclick', 'addFriend(event)');
    button.classList.add('btn');
    button.classList.add('btn-success');
    button.classList.add('fas');
    button.classList.add('fa-plus');
    return button;
}

function addFriend(event) {
    let userId = event.target.getAttribute('data-user-id');

    fetch('/friends/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId
        })
    })
    .then(response => {
        if(response.ok) {
            event.target.parentNode.remove();
        }
    })
    .catch(error => console.log(`Error: ${error}`));
}