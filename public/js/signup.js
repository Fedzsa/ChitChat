const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
        'username': document.getElementById('inputUsername').value,
        'email': document.getElementById('inputEmail').value,
        'password': document.getElementById('inputPassword').value,
        'confirmPassword': document.getElementById('inputConfirmPassword').value,
    };
    
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(response.ok) {
            window.location.href = '/login';
        }
    })
    .then(response => response.json())
    .then(data => insertValidationErrors(data))
    .catch(error => console.error(`Error: ${error}`));
});

function insertValidationErrors(errors) {
    errors.forEach((value) => {
        const element = document.getElementsByName(value.param)[0];
        element.after(createAlertLabel(value.msg));
        element.classList.add('invalid-input');
    });
}

function createAlertLabel(message) {
    const alertLabel = document.createElement('div');
    alertLabel.classList.add('invalid-message');
    alertLabel.innerHTML = message;
    return alertLabel;
}