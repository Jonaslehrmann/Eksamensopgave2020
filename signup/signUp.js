// Create a very simple class
class User {
    constructor(firstname, lastname, birthday, gender,email, password, ssn ){
        this.firstName = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.birthday = birthday;
        this.email = email;
        this.password = password;
        this.ssn = ssn;
    }
}

// Construct the object
const henrik = new User("Henrik", "Thorn", "100185", "male", "ht.digi@cbs.dk", "qwerty", "100185-1111");

// We only want to do something when the dom is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Find the table
    let table = document.getElementById("personProfile");
    let html = "";

    // Get all the keys in our object
    let objectKeys = Object.keys(henrik);

    // Loop through the keys in our array
    for (let objectKey of objectKeys) {
        // Construct the needed HTML for the table
        html += "<tr><td>" + objectKey + "</td><td>" + henrik[objectKey] + "</td></tr>";
    }

    // Set the table with the updated HTML
    table.innerHTML = html;

    let password = document.getElementById("password");
    password.addEventListener("keyup", function(){
        let password = document.getElementById("password").value;
        let errorText = "";

        if(password == "" || password.length < 6){
            errorText += "Please submit password that is at least six chars \n";
        }

        if(errorText != ""){
            document.getElementById("message").innerText = errorText;
        }else {
            document.getElementById("message").innerText = "Password is valid";
        }


    });

    // Find the buttom in the DOM
    let button = document.getElementById("submit");
    
    // We add an event listener
    button.addEventListener("click", function(){
        let errorText = "";
        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let email = document.getElementById("email").value;
        let birthday = document.getElementById("birthday").value;
        let ssn = document.getElementById("ssn").value;
        let gender = document.getElementById("gender").value;
        let password = document.getElementById("password").value;
        
        const regExForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

        if(firstname == ""){
            errorText += "Fistname is empty\n";            
        }
        if(lastname == ""){
            errorText += "Fistname is empty\n";            
        }
        if(regExForEmail.test(String(email).toLowerCase())){
            errorText += "Email is not valid\n";
        }
        if(birthday == "" && birthday.length != 8) {
            errorText += "Birthday is not valid or not in valid format\n";
        }
        if(ssn == ""){
            errorText += "Please submit a CPR\n";
        }else if(ssn.length != 13 || ssn.indexOf("-") == 7){
            errorText += "Please submit valid CPR\n";
        }
        if(gender == "" || (gender != "male" || gender != "female")){
            errorText += "You need to input a valid gender. Either female or male\n";
        }
        if(password == "" || password.length < 6){
            errorText += "Please submit password that is at least six chars \n";
        }
        
        // If we have errors we output them
        if(errorText != ""){
            document.getElementById("message").innerText = errorText;
        }else {
            let newUser = new User(firstname, lastname, birthday, gender, email, password, ssn);
        }
    });
});