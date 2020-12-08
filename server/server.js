const { response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs')
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.json({ limit: '10mb' }));
app.use(express.static('../views'));

//HARDCODED USERS
class UserProfile {
    constructor(fullName, username, gender, password, likes) {
        this.fullName = fullName;
        this.username = username;
        this.gender = gender;
        this.password = password;
        this.likes = likes
    }
}
let user1 = new UserProfile("Patrik Patriksen", "patrikmanden123", "male", "", ["jonas1"])
let user2 = new UserProfile("Patricia Patriciasen", "patriciaersej123", "female", "", [])
let user3 = new UserProfile("Peter Petersen", "peter123", "male", "peter1234", "jonas1")
let users = [user1, user2, user3]

// Register controller
app.post('/user', (req, res) => {

    let dataUserSignUp = JSON.parse(fs.readFileSync('../storage/User.json'))

    // I make sure the password is unique by comparing to the users in storage//User.json
    for (var i = 0; i < dataUserSignUp.length; i++) {
        if (dataUserSignUp[i].usernameValue == req.body.usernameValue) {
            res.json('fail')
        }
    }
    // if the password is unique, I push the new user onto the user.json file and rewrite the file
    dataUserSignUp.push(req.body)
    res.json('success')
    fs.writeFile('../storage/User.json', JSON.stringify(dataUserSignUp, null, 4), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    })
});

// Show profile Controller
app.post('/userGet', (req, res) => {
    let dataUserLogin = JSON.parse(fs.readFileSync('../storage/User.json'))
    let retrievedUser = false;
    // I loop through my users to find the person whose username matches
    // then I respond with that information
    for (var i = 0; i < dataUserLogin.length; i++) {
        if (
            req.body.username == dataUserLogin[i].usernameValue
        ) {
            res.json(dataUserLogin[i]);
            retrievedUser = true;
        }
    }
    if (retrievedUser == false) {
        res.json('fail')
    }
});



// Delete User Controller
app.delete('/deleteuser', (req, res) => {

    // Mock variable to determine success or fail in a loop
    let mongoDBSucks = true;

    let dataUserDelete = JSON.parse(fs.readFileSync('../storage/User.json'))

    for (var i = 0; i < dataUserDelete.length; i++) {
        if (req.body.usernameDelete == dataUserDelete[i].usernameValue) {
            // I use the splice function to pick one object out of an array and then delete it
            dataUserDelete.splice([i], 1)
            fs.writeFile('../storage/User.json', JSON.stringify(dataUserDelete, null, 4), (err) => {
                if (err) throw err;
            })
            res.json('user deleted')
            mongoDBSucks = false
        }
    }
    if (mongoDBSucks == true) {
        res.json('fail')
    }
});

// Login controller
app.post('/login', (req, res) => {
    let dataUserLogin = JSON.parse(fs.readFileSync('../storage/User.json'))
    let succesfulLogin = false;

    for (var i = 0; i < dataUserLogin.length; i++) {
        // once again a mock variable to determine success or fail

        if (
            // If username and password matches a user in the database, send back that information
            req.body.usernameAttempt == dataUserLogin[i].usernameValue
            && req.body.passwordAttempt == dataUserLogin[i].passwordValue) {
            res.json(dataUserLogin[i]);
            succesfulLogin = true;
        }
    }
    if (succesfulLogin == false) {
        res.json('fail')
    }
});

// Edit profile controller
app.post('/userEdit', (req, res) => {
    // when the server response wasn't working, I console.log'ed my way through each variable to find the failure
    // console.log('vi når til serveren')

    let dataUserStorage = JSON.parse(fs.readFileSync('../storage/User.json'))
    let succesfulLogin = false;

    // instead of editing in a json objekt, I thought it would be easier to delete the profile and 
    // rewrite his file.
    for (var i = 0; i < dataUserStorage.length; i++) {
        if (dataUserStorage[i].usernameValue == req.body.usernameToken) {
            let likedUsers = dataUserStorage[i].likes
            // I have to make sure that the likes won't get lost when I rewrite the user
            console.log(likedUsers)
            dataUserStorage.splice([i], 1)

            // I create a new user, though with the same username and likes as before
            let editedUser = {
                fullNameValue: req.body.fullNameValue,
                usernameValue: req.body.usernameToken,
                genderValue: req.body.genderValue,
                passwordValue: req.body.passwordValue,
                likes: likedUsers
            }
            // I then add the user to the storage again, and then I rewrite the file
            dataUserStorage.push(editedUser)
            fs.writeFile('../storage/User.json', JSON.stringify(dataUserStorage, null, 4), (err) => {
                if (err) throw err;
            })
            succesfulLogin = true;
            res.json(editedUser)
        }
    }
    if (succesfulLogin == false) {
        res.json("Something went wrong - try again")
    }
});


//retrieves the hardcoded users
app.get('/importUser', (req, res, next) => {
    res.json(users)
})


//ADD LIKES TO JSON FILE

app.post('/likes', (req, res) => {
    let dataUserLogin = JSON.parse(fs.readFileSync('../storage/User.json'))

    let successfulLike = false;
    for (var i = 0; i < dataUserLogin.length; i++) {

        if (
            // I find the persone who's logged in
            req.body[0] == dataUserLogin[i].usernameValue
        ) {
            // Then I push the person they liked into their like array
            dataUserLogin[i].likes.push(req.body[1])
            successfulLike = true;
            fs.writeFile('../storage/User.json', JSON.stringify(dataUserLogin, null, 4), (err) => {
                if (err) throw err;
                console.log('Data written to file');
            })
            res.json('success')
        }
    }
    if (successfulLike == false) {
        res.json('fail')
    }

});