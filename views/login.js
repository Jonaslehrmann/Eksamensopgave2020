const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.querySelector('form');
const loginButton = document.querySelector('#loginButton');

form.addEventListener('submit', function(e){
    e.preventDefault();
});
loginButton.addEventListener('click', function(){
    let userAttempt = {
        usernameAttempt: username.value,
        passwordAttempt: password.value,
    }   
    console.log(userAttempt)
})

function createUserAttempt(){
    
    
    let userAttempt = {
        usernameAttempt: username.value,
        passwordAttempt: password.value,
   
    }   
    console.log(userAttempt)
}
/*
function checkLogin(user){
    fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(res => res.json())
      .then(data => 
          {
        alert("You've successfully logged in");
        location.href="homepage.html"
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      };
*/
/*for (i = 0; i < users.length; i++) {
    if (usernameOutput == usernameValue[i]){


    }
  }
  */