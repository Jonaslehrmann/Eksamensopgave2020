const { json } = require("body-parser");
const { parse } = require("path");
const { profile } = require("console");

window.onload = function checkLogin() {
    console.log(localStorage.getItem('username'))
    if (localStorage.getItem('username') == null) {
        alert("You are yet to sign in. You will be redirected to the login page")
        location.href = ('login.html')
    }
}

const logoutButton = document.getElementById('logout');

function logout() {
    localStorage.removeItem("username");
    alert('You are now logged out')
    location.href = ('login.html')
}


function deleteUser2(){
    let profileToken = JSON.parse(localStorage.getItem('username'))
    let deleteProfile = {
        usernameDelete: profileToken
    } 

    deleteUser(deleteProfile)
}

function deleteUser(deleteProfile) {


    console.log(deleteProfile)
    fetch('http://localhost:3003/deleteuser', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteProfile),
    }).then(res => res.json())
        .then(data => {
            if (data == 'user deleted') {
                alert('Your account has successfully been deleted');
                localStorage.removeItem('username')
                location.href = "index.html"
            } else {
                alert('Something went wrong')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

};


function seeUser() {
    fetch('http://localhost:3003/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => {
            console.log(data.username)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};