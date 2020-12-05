
const form = document.querySelector('form');
const rememberDiv = document.querySelector('.signUp');
const fullName = document.getElementById('fullName');
const password = document.getElementById('password');
const username = document.getElementById('username');
const gender = document.getElementById('gender')

const submitBtn = document.querySelector('#submitUser');

const h2 = document.querySelector('h2')
const personalGreeting = document.querySelector('.personalGreeting')


form.addEventListener('submit', function(e){
    e.preventDefault();
});

submitBtn.addEventListener('click', function(){
    let user = {
        fullNameValue: fullName.value,
        usernameValue: username.value,
        genderValue: gender.value,
        passwordValue: password.value,
        likes: [],
        }

    validateUser(user)  
})

function validateUser(){
        let errorText = [];
        if(fullName.value == ""){
            errorText += "Please enter your full name\n";            
        }        
        if(password.value.length < 5){
            errorText += "Your password must contain atleast 6 characters\n"
        }
        if(username.value < 5){
            errorText += "You need to input a valid gender. Either female or male\n";
        }
       
        if(errorText != ""){
            document.getElementById("message").innerText = errorText;
        }else {
            
            let user = {
                fullNameValue: fullName.value,
                usernameValue: username.value,
                genderValue: gender.value,
                passwordValue: password.value,
                likes:[]
                }
            uploadUser(user);
        }
    }

function uploadUser(user){

    console.log(user)  
    fetch('http://localhost:3003/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(res => res.json())
      .then(data => 
          {
        alert('Your account has successfully been created');
        location.href="login.html"
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      };