const { response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs')
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.json({limit: '10mb'}));
app.use(express.static('../views'));

app.post('/user', (req,res) => {

    let dataUser = JSON.parse(fs.readFileSync('../storage/User.json'))
    dataUser.push(req.body)
    res.json(dataUser)
    
    fs.writeFile('../storage/User.json', JSON.stringify(dataUser, null, 4), (err) => {
        if (err) throw err;
        console.log('Data written to file');
})});


app.post('/login', (req,res) => {
    console.log(req.body)
    let dataUser = JSON.parse(fs.readFileSync('../storage/User.json'))
    res.json(dataUser)
    for (i = 0; i < dataUser.length; i++) {
        if (req.body.usernameValue == dataUser[i].username 
            && req.body.passwordValue == dataUser[i].password)
                {alert('You have successfully logged in')
                location.href="homepage.html"
            }else {
                alert('Your username and password do not match. Try again!')
            }
        } 
      }
);