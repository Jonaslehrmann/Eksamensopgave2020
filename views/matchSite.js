const { json } = require("body-parser");
// checks if the person is logged in
window.onload = function checkLogin() {
    console.log(localStorage.getItem('username'))
    if (localStorage.getItem('username') == null) {
        alert("You are yet to sign in. You will be redirected to the login page")
        location.href = ('login.html')
    }
}
// the logout button
function logout() {
    localStorage.clear();
    alert('You are now logged out')
    location.href = ('login.html')

}
// get function to retrieve users
function importUser() {
    fetch('http://localhost:3003/importUser', {
    }).then(res => res.json())
        .then(data => {
            let userData = data
            console.log(userData)
            showUser(userData)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function showUser(userData) {
    for (var i = 0; i < userData.length; i++) {
        console.log(userData.length)
        document.getElementById("username").innerHTML = userData[i].username
        document.getElementById("fullName").innerHTML = userData[i].fullName
        document.getElementById("gender").innerHTML = userData[i].gender
        localStorage.setItem("like", JSON.stringify(userData[i].username))
    }
    // Funktionen virker ikke med andre end den sidste user, fordi jeg ikke kan stoppe mit array
    // Jeg ville nok prøve mig ad med await eller async 
    // Eventuelt kunne jeg prøve en funktion af, der henter ny bruger ned, hver gang man trykker like/dislike
}
// adds the liked users username to an array called "likes" which is unique to every user
function likeUser() {
    let myUsername = [JSON.parse(localStorage.getItem("username")), JSON.parse(localStorage.getItem("like"))]
    fetch('http://localhost:3003/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myUsername)
    }).then(res => res.json()).then(data => {
        if (data != "fail") {
            alert("Cool, the user has been added to your likes")
            localStorage.removeItem('like')
        } else {
            alert("Something went wrong")
        }
    })
}