window.onload = function checkLogin() {
    console.log(localStorage.getItem('username'))
    if (localStorage.getItem('username') == null) {
        alert("You are yet to sign in. You will be redirected to the login page")
        location.href = ('login.html')
    }
}
// I made the username unique and fixed to create a user ID - !! could've used a seperate id variable !!
// If i let the user change their username, I would've probably run into trouble at the matchmaking function
window.onload = document.getElementById("usernameFixed").innerHTML = JSON.parse(localStorage.getItem("username"));

const form = document.querySelector('form');
const fullName = document.getElementById('fullName');
const password = document.getElementById('password');
const username = document.getElementById('username');
const gender = document.getElementById('gender')

const submitBtn = document.getElementById('submitUserEdit');
let usernameTokenInput = JSON.parse(localStorage.getItem('username'))

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let userEdit = {
        fullNameValue: fullName.value,
        usernameValue: JSON.parse(localStorage.getItem("username")),
        genderValue: gender.value,
        passwordValue: password.value,
        likes: [],
    }

    validateUser(userEdit)
})
// I validate the updated information before I send it to the server
function validateUser() {
    let errorText = [];
    if (fullName.value == "") {
        errorText += "Please enter your full name\n";
    }
    if (password.value.length < 5) {
        errorText += "Your password must contain atleast 6 characters\n"
    }
    if (errorText != "") {
        document.getElementById("message").innerText = errorText;
    } else {

        let userEdit = {
            usernameToken: usernameTokenInput,
            fullNameValue: fullName.value,
            usernameValue: usernameTokenInput,
            genderValue: gender.value,
            passwordValue: password.value,
            likes: []
        }
        console.log(userEdit)
        editUser(userEdit);
    }
}
// when the user is validated, I post the new user to our server 
// --> look server/server.js --> edit profile controller
function editUser(userEdit) {

    console.log(userEdit)
    fetch('http://localhost:3003/userEdit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userEdit),
    }).then(res => res.json())
        .then(data => {
            if (data != 'fail') {
                // I tried to make a changeable username work, but it would get too messy and unmanageable
                /*localStorage.clear()
                localStorage.setItem("username",JSON.stringify(data.usernameValue))*/
                alert('Your account has successfully been edited');
                location.href = "homepage.html"
            } else {
                alert('Your username is not unique. Please choose another username')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
