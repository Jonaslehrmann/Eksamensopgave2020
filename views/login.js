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

    loginAttempt(userAttempt);

    console.log(userAttempt)
})

function loginAttempt(userAttempt){
    fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAttempt),
      }).then(res => res.json())
      .then(data => 
        { if (data = "success"){
            alert("welcome to My Dating Site")
            localStorage.setItem("username", username.value)
            location.href="homepage.html"
        } else {
            alert("Your username and password do not match. Try again!")
        }


      })
      .catch((error) => {
        console.error('Error:', error);
      });
      };

