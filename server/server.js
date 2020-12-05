const { response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs')
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.json({limit: '10mb'}));
app.use(express.static('../views'));



// Sign in controller
app.post('/user', (req,res) => {

    let dataUserSignUp = JSON.parse(fs.readFileSync('../storage/User.json'))
    dataUserSignUp.push(req.body)
    res.json(dataUserSignUp)
    
    fs.writeFile('../storage/User.json', JSON.stringify(dataUserSignUp, null, 4), (err) => {
        if (err) throw err;
        console.log('Data written to file');
})});


app.post('/login', (req,res) => {
    let dataUserLogin = JSON.parse(fs.readFileSync('../storage/User.json'))

    for (i = 0; i < dataUserLogin.length; i++) {
        if (req.body.usernameValue == dataUserLogin[i].username 
            && req.body.passwordValue == dataUserLogin[i].password){
                res.json('success')
                break
            }else {
                res.json('fail')
            }
        } 
      } 
);
app.delete('/delete',(req,res) => {
    let dataUserDelete = JSON.parse(fs.readFileSync('../storage/User.json'))
    // splice!!!

});