window.onload = function checkLogin() {
    console.log(localStorage.getItem('username'))
    if (localStorage.getItem('username') == null) {
        alert("You are yet to sign in. You will be redirected to the login page")
        location.href = ('login.html')
    }
}
window.onload = function userGet(){
    let profileToken = JSON.parse(localStorage.getItem('username'))
    let retrieveUsername = {
        username: profileToken
    } 

    retrieveUserInfo(retrieveUsername)
}


function retrieveUserInfo(retrieveUsername){
    fetch('http://localhost:3003/userGet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(retrieveUsername),
    }).then(res => res.json())
        .then(data => {
            if (data != 'fail') {
                document.getElementById("username").innerHTML = data.usernameValue
                document.getElementById("fullName").innerHTML = data.fullNameValue
                document.getElementById("gender").innerHTML = data.genderValue
                document.getElementById("password").innerHTML = data.passwordValue
            } else {
                alert('Something went wrong')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function logout() {
    localStorage.removeItem("username");
    alert('You are now logged out')
    location.href = ('login.html')
}

