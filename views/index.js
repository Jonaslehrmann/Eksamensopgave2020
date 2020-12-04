
const form = document.querySelector('form');
const forgetDiv = document.querySelector('.forgetUser');
const rememberDiv = document.querySelector('.signUp');
const fullName = document.getElementById('fullName');
const password = document.getElementById('password');
const submitBtn = document.querySelector('#submitUser');
const forgetBtn = document.querySelector('#forget');

const h2 = document.querySelector('h2')
const personalGreeting = document.querySelector('.personalGreeting')
const signInGreeting = document.querySelector('.signInGreeting')

form.addEventListener('submit', function(e){
    e.preventDefault();
});

submitBtn.addEventListener('click', function(){
    const fullNameValue = fullName.value
    const passwordValue = password.value
    const data ={fullNameValue,passwordValue}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application.json'
        },
        body:JSON.stringify(data)
    };
    fetch('/api',options).then(response => {
        console.log(response)
    });

    
    localStorage.setItem('name', fullNameValue);
    localStorage.setItem('password', passwordValue);
    nameDisplayCheck()
})

forgetBtn.addEventListener('click', function(){
    localStorage.removeItem('name')
    localStorage.removeItem('password')
    nameDisplayCheck()
})

function nameDisplayCheck() {
    if(localStorage.getItem('name')){
        let name = localStorage.getItem('name');
        h2.textContent = 'Welcome ' + name;
        personalGreeting.textContent = 'You have succesfully signed in, ' + name;
        signInGreeting.textContent = 'Pls click this button to sign in'
        forgetDiv.style.display = 'block'
        rememberDiv.style.display = 'none'
        } else {
            h2.textContent = 'Welcome to my Dating Site';
            personalGreeting.textContent = 'You are yet to sign up or login';
            forgetDiv.style.display = 'none'
            rememberDiv.style.display = 'block'
        }
    }

document.body.onload = nameDisplayCheck