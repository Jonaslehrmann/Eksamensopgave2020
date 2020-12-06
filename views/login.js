window.onload = function checkLogin() {
    if (localStorage.getItem('username') != null) {
        alert("You're already signed in! Click okay to go to the home page ")
        location.href = ('homepage.html')
    }
}
const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.querySelector('form');
const loginButton = document.querySelector('#loginButton');


form.addEventListener('submit', function (e) {
    e.preventDefault();
});

function loginAttempt() {
    console.log(username)
    let userAttempt = {
        usernameAttempt: username.value,
        passwordAttempt: password.value,
    }
    fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAttempt)
    }).then(res => res.json()).then(data => {

        if (data != "fail") {
            alert("welcome to My Dating Site")
            localStorage.setItem("username", JSON.stringify(data.usernameValue))
            location.href = "homepage.html"
        } else {
            alert("Your username and password do not match. Try again!")
        }
    })
        .catch((error) => {
            console.error('Error:', error);
        });
};

