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
        li.innerHTML = value.username;
        userList.appendChild(li);
    });
}