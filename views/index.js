//If the user is already logged in, they will be redirected to the homepage
window.onload = function checkLogin() {
    if (localStorage.getItem('username') != null) {
        alert("You're already signed in! Click okay to go to the home page ")
        location.href = ('homepage.html')
    }
}
const form = document.querySelector('form');
const fullName = document.getElementById('fullName');
const password = document.getElementById('password');
const username = document.getElementById('username');
const gender = document.getElementById('gender')

const submitBtn = document.querySelector('#submitUser');

form.addEventListener('submit', function (e) {
    e.preventDefault();
});

submitBtn.addEventListener('click', function () {
    let user = {
        fullNameValue: fullName.value,
        usernameValue: username.value,
        genderValue: gender.value,
        passwordValue: password.value,
        likes: [],
    }

    validateUser(user)
})
// I make sure the user information meets some requirements
// I could've been more strict, but the concept works
function validateUser() {
    let errorText = [];
    if (fullName.value == "") {
        errorText += "Please enter your full name\n";
    }
    if (password.value.length < 5) {
        errorText += "Your password must contain atleast 6 characters\n"
    }
    if (username.value.length < 5) {
        errorText += "your username must contain atleast 6 characters\n";
    }

    if (errorText != "") {
        document.getElementById("message").innerText = errorText;
    } else {

        let user = {
            fullNameValue: fullName.value,
            usernameValue: username.value,
            genderValue: gender.value,
            passwordValue: password.value,
            likes: []
        }
        uploadUser(user);
        // I add an empty array called likes for later use
    }
}
// I post the information to the server. The only validation missing is to check if the username is unique
// --> server/server.js --> Register controller
function uploadUser(user) {

    console.log(user)
    fetch('http://localhost:3003/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(res => res.json())
        .then(data => {
            if (data != 'fail') {
                alert('Your account has successfully been created');
                location.href = "login.html"
            } else {
                alert('Your username is not unique. Please choose another username')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};