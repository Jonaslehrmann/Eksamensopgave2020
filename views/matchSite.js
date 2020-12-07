window.onload = function checkLogin() {
    console.log(localStorage.getItem('username'))
    if (localStorage.getItem('username') == null) {
        alert("You are yet to sign in. You will be redirected to the login page")
        location.href = ('login.html')
    }
}

function logout() {
    localStorage.removeItem("username");
    alert('You are now logged out')
    location.href = ('login.html')
}
let user1 = new User ("Patrik Patriksen","patrikmanden123","male","",["Jonas Lehrmann"])
let user2 = new User ("Patricia Patriciasen","patriciaersej123","female","",[])

console.log(user1)