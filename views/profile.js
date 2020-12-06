window.onload = function checkLogin() {
    console.log(localStorage.getItem('username'))
    if (localStorage.getItem('username') == null) {
        alert("You are yet to sign in. You will be redirected to the login page")
        location.href = ('login.html')
    }
}/*
window.onload = function retrieveUserInfo(){
    fetch('http://localhost:3003/info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAttempt)
    }).then(res => res.json()).then(data => {
      
}}
*/

const logoutButton = document.getElementById('logout');

function logout() {
    localStorage.removeItem("username");
    alert('You are now logged out')
    location.href = ('login.html')
}

