window.onload = function checkLogin() {
    console.log(localStorage.getItem('username'))
    if (localStorage.getItem('username') == null) {
        alert("You are yet to sign in. You will be redirected to the login page")
        location.href = ('login.html')
    }
}

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
        usernameValue: username.value,
        genderValue: gender.value,
        passwordValue: password.value,
        likes: [],
    }

    validateUser(userEdit)
})

function validateUser() {
    let errorText = [];
    if (fullName.value == "") {
        errorText += "Please enter your full name\n";
    }
    if (password.value.length < 5) {
        errorText += "Your password must contain atleast 6 characters\n"
    }
    if (username.value < 5) {
        errorText += "your username must contain atleast 6 characters\n";
    }

    if (errorText != "") {
        document.getElementById("message").innerText = errorText;
    } else {

        let userEdit = {
            usernameToken: usernameTokenInput,
            fullNameValue: fullName.value,
            usernameValue: username.value,
            genderValue: gender.value,
            passwordValue: password.value,
            likes: []
        }
        console.log(userEdit)
        alert(usernameTokenInput)
        editUser(userEdit);
    }
}

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
                localStorage.clear()
                localStorage.setItem("username",data.usernameValue)
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













/*const fullName = document.getElementById('fullName');
const password = document.getElementById('password');
const username = document.getElementById('username');
const gender = document.getElementById('gender')

const submitBtn = document.querySelector('#submitUserEdit').addEventListener("click", theButton(e))

function theButton() {
    console.log("knappenvirker")
    let user = {
        fullNameValue: fullName.value,
        usernameValue: username.value,
        genderValue: gender.value,
        passwordValue: password.value,
        likes: [],
    }

    validateUser(user)
}

function validateUser() {
    console.log("vi når til callback")
    debugger
    let errorText = [];
    if (fullName.value == "") {
        errorText += "Please enter your full name\n";
    }
    if (password.value.length < 5) {
        errorText += "Your password must contain atleast 6 characters\n"
    }
    if (username.value < 5) {
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
    }
}


function uploadUser(user) {

    console.log(user)
    fetch('http://localhost:3003/userEdit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(res => res.json())
        .then(data => {
            if (data != 'fail'){
            alert('Your account has successfully been edited');
            location.href = "homepage.html"
        }else{
            alert('Your username is not unique. Please choose another username')
        }
    })
        .catch((error) => {
            console.error('Error:', error);
        });
};
*/