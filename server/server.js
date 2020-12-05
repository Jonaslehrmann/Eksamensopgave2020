const { response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs')
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.json({limit: '10mb'}));
app.use(express.static('../views'));

app.post('/user', (req,res) => {
    console.log(req.body)
    console.log('I got a request')

    let dataarray = JSON.parse(fs.readFileSync('../storage/User.json'))
    console.log(dataarray)
    dataarray.push(req.body)
    res.json(dataarray)
    
    
    fs.writeFile('../storage/User.json', JSON.stringify(dataarray, null, 4), (err) => {
        if (err) throw err;
        console.log('Data written to file');
})});