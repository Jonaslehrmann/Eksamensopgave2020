const express = require('express')
const app = express()
const port = 3000


const userController = require('../controller/userController')
const protectedController = require('../controller/protectedController')
const loginController = require('../controller/loginController')
const ensureToken = require('../token/ensuretoken')

app.get('/', userController)
app.get('../controller/protectedController', ensureToken,  protectedController)


app.post('/login', loginController)
//GET is used to retrieve data from the database
//POST is used to send to the database
//PUT is used to update existing resources. It repalces the entire resource and doesn't do partial updates
//DELETE simply deletes resources from the database
app.get('/userHardCode', (req, res) => { 
  res.send(userArray)

});

app.post('/userHardCode', (req, res) => { 
  res.send("Post request recieved")

});

app.put('/userHardCode', (req, res) => { 
  res.send("Put request recieved")

});

app.delete('/userHardCode', (req, res) => { 
  res.send("Delete request recieved")

});


app.get('/userHardCode/interest', (req, res) => { 
  res.send("User1: " + user1.interest + " User2: " + user2.interest)

});

app.post('/userHardCode/interest', (req, res) => { 
  res.send("Post request recieved")

});

app.put('/userHardCode/interest', (req, res) => { 
  res.send("Put request recieved")

});

app.delete('/userHardCode/interest', (req, res) => { 
  res.send("Delete request recieved")

});

app.get('/userHardCode/match', (req, res) => { 
  res.send(user1.match + " " + user2.match)

});

app.post('/userHardCode/match', (req, res) => { 
  res.send("Post request recieved")

});

app.put('/userHardCode/match', (req, res) => { 
  res.send("Put request recieved")

});

app.delete('/userHardCode/match', (req, res) => { 
  res.send("Delete request recieved")

});


app.listen(port, console.log('Serveren kører på port ' + port));
