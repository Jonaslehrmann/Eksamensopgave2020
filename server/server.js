const { response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs')
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.json({ limit: '10mb' }));
app.use(express.static('../views'));



// Sign in controller
app.post('/user', (req, res) => {

    let dataUserSignUp = JSON.parse(fs.readFileSync('../storage/User.json'))
    
    //Sørger for at username er unikt ved at tjekke med User.json
    for (var i = 0; i < dataUserSignUp.length; i++){
        if (dataUserSignUp[i].usernameValue == req.body.usernameValue){
            res.json('fail')
        }
    }
    dataUserSignUp.push(req.body)
    res.json(dataUserSignUp)

    fs.writeFile('../storage/User.json', JSON.stringify(dataUserSignUp, null, 4), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    })
});

// Show profile Controller
app.post('/userGet', (req, res) => {
    let dataUserLogin = JSON.parse(fs.readFileSync('../storage/User.json'))
    let retrievedUser = false;
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
    let mongoDBSucks = true;
    let dataUserDelete = JSON.parse(fs.readFileSync('../storage/User.json'))

    for (var i = 0; i < dataUserDelete.length; i++) {
        if (req.body.usernameDelete == dataUserDelete[i].usernameValue) {
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


    for (var i = 0; i < dataUserLogin.length; i++) {
        let succesfulLogin = false;
        if (
            req.body.usernameAttempt == dataUserLogin[i].usernameValue
            && req.body.passwordAttempt == dataUserLogin[i].passwordValue) {
            res.json(dataUserLogin[i]);
            succesfulLogin = true;
        }
    }
    if (succesfulLogin = false) {
        res.json('fail')
    }
});

// Edit controller
app.post('/userEdit', (req, res) => {
    console.log('vi når til serveren')
    let dataUserStorage = JSON.parse(fs.readFileSync('../storage/User.json'))

    let succesfulLogin = false;
    for (var i = 0; i < dataUserStorage.length; i++){
        if (dataUserStorage[i].usernameValue == req.body.usernameToken){
            let likedUsers = dataUserStorage[i].likes
            console.log(likedUsers)
            dataUserStorage.splice([i], 1)
            
            let editedUser = {
                fullNameValue: req.body.fullNameValue,
                usernameValue: req.body.usernameValue,
                genderValue: req.body.genderValue,
                passwordValue: req.body.passwordValue,
                likes: likedUsers
            }
            fs.writeFile('../storage/User.json', JSON.stringify(editedUser, null, 4), (err) => {
                if (err) throw err;
            })
            res.json('success')
             succesfulLogin = true;
        }
    }
    if (succesfulLogin = false){
        alert("Something went wrong - try again")
    }
    dataUserStorage.push(req.body)
    res.json(dataUserStorage)

    /*fs.writeFile('../storage/User.json', JSON.stringify(dataUserStorage, null, 4), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    }) */
});
