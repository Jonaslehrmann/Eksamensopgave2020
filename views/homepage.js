const { json } = require("body-parser");
const { parse } = require("path");
const { profile } = require("console");
// I check if the user is signed in or not
// if they are not, they will be redirected to the login page
window.onload = function checkLogin() {
    if (localStorage.getItem('username') == null) {
        alert("You are yet to sign in. You will be redirected to the login page")
        location.href = ('login.html')
    }
}
// logout button keeps the user saved in the database, but removes the user from localstorage
const logoutButton = document.getElementById('logout');
// the function is invoked with the onclick() function
function logout() {
    localStorage.removeItem("username");
    alert('You are now logged out')
    location.href = ('login.html')
}

// the function is invoked with the onclick() function
function deleteUser2(){
    let profileToken = JSON.parse(localStorage.getItem('username'))
    let deleteProfile = {
        usernameDelete: profileToken
    } 

    deleteUser(deleteProfile)
}
// I send my unique username from localstorage, and on the server side I delete the user with the same username
// --> server/server.js --> delete User Controller
function deleteUser(deleteProfile) {
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
// Function I was working on to send user information on the homepage, but I decided to use a seperate page
/*
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
*/