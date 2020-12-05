onload = function(){
    if(localStorage.getItem('username') == ''){
    alert("You are yet to sign in. You will be redirected to the login page")
    window.location.replace = "login.html";
    }
}