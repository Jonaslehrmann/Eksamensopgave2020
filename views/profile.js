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
                console.log("hej")
                
                
            } else {
                alert('Something went wrong')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const logoutButton = document.getElementById('logout');

function logout() {
    localStorage.removeItem("username");
    alert('You are now logged out')
    location.href = ('login.html')
}

