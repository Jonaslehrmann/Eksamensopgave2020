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
    dataUserSignUp.push(req.body)
    res.json(dataUserSignUp)

    fs.writeFile('../storage/User.json', JSON.stringify(dataUserSignUp, null, 4), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    })
});

// Show profile Controller

app.get('/userGet', (req,res) => {
    let dataUser = JSON.parse(fs.readFileSync('../storage/User.json'))

    for (i = 0; i < dataUser.length; i++) {
        if (localStorage.getItem('username') == dataUser[i].username) 
            {
                res.json(dataUser[i])
                break
            }else {
                res.json('fail')
            }
        } 
      } 
); // VED IKKE OM DET HER VIRKER - HELP


// Delete User Controller
app.delete('/delete', (req, res) => {
    let dataUserDelete = JSON.parse(fs.readFileSync('../storage/User.json'))
    let loggedInUsername = JSON.parse(req.body)
    console.log(loggedInUsername)
    console.log(dataUserDelete)
    for (var i = 0; i < dataUserDelete.length; i++) {
        if (loggedInUsername == dataUserDelete[i].usernameValue) {
            dataUserDelete.splice(i, 1)
            res.json('user deleted')
        } else {
            res.json('fail')
        }

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
            res.json('success');
            succesfulLogin = true;
        }
    }
    if (succesfulLogin = false) {
        res.json('fail')
    }
});