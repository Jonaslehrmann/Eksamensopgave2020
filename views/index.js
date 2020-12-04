
const form = document.querySelector('form');
const forgetDiv = document.querySelector('.forgetUser');
const rememberDiv = document.querySelector('.signUp');
const fullName = document.getElementById('fullName');
const password = document.getElementById('password');
const username = document.getElementById('username');
const dateOfBirth = document.getElementById('dateOfBirth');
const gender = document.getElementById('gender')

const submitBtn = document.querySelector('#submitUser');
const forgetBtn = document.querySelector('#forget');

const h2 = document.querySelector('h2')
const personalGreeting = document.querySelector('.personalGreeting')


form.addEventListener('submit', function(e){
    e.preventDefault();
});

submitBtn.addEventListener('click', function(){
    
    let user = {
        fullNameValue: fullName.value,
        usernameValue: username.value,
        dateOfBirthValue: dateOfBirth.value,
        genderValue: gender.value,
        passwordValue: password.value,
    }
 

    uploadUser(user)
    
    localStorage.setItem('name', fullName.value);
    localStorage.setItem('username',username.value);
    localStorage.setItem('dateOfBirth', dateOfBirth.value);
    localStorage.setItem('gender', gender.value);
    localStorage.setItem('password', password.value);
    nameDisplayCheck()
})

forgetBtn.addEventListener('click', function(){
    localStorage.removeItem('name')
    localStorage.removeItem('password')
    localStorage.removeItem('gender')
    localStorage.removeItem('dateOfBirth')
    localStorage.removeItem('username')
    nameDisplayCheck()
})

function nameDisplayCheck() {
    if(localStorage.getItem('name')){
        let name = localStorage.getItem('name');
        h2.textContent = 'Welcome ' + name;
        personalGreeting.textContent = 'You have succesfully signed in, ' + name;
        forgetDiv.style.display = 'block'
        rememberDiv.style.display = 'none'
        } else {
            h2.textContent = 'Welcome to my Dating Site';
            personalGreeting.textContent = 'You are yet to sign up or login';
            forgetDiv.style.display = 'none'
            rememberDiv.style.display = 'block'
        }
    }

function uploadUser(){
    fetch('http://localhost:3003/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      }).then(response => response.json()).then(data => 
          {
        alert('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      };

document.body.onload = nameDisplayCheck