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



function deleteUser() {

    fetch('http://localhost:3003/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => {
            console.log(res.json())
            if(data == 'user deleted'){
            alert('Your account has successfully been deleted');
            location.href = "index.html"
            } else {
                alert('Something went wrong')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};


function seeUser(user) {
    get('http://localhost:3003/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(res => res.json())
        .then(data => {
            console.log(data.username)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};