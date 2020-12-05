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

    peterDreyer(userAttempt);

    console.log(userAttempt)
})

/*function createUserAttempt(){
    
    
    let userAttempt = {
        usernameAttempt: username.value,
        passwordAttempt: password.value,
   
    }   
    console.log(userAttempt)
}*/

function peterDreyer(userAttempt){
    fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAttempt),
      }).then(res => res.json())
      .then(data => 
          {
        alert("You've successfully logged in");
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      };

