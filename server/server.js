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