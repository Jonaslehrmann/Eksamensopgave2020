const { response } = require('express');
const express = require('express');
const app = express();
app.listen(3003, () => console.log('listening on 3003'));

app.use(express.json({limit: '10mb'}));
app.use(express.static('../views'));

app.post('http://localhost:3003/user', (req,res) => {
    console.log(req.body)
    console.log('I got a request')
    const data = req.body;
    response.json({
        status: 'success',
    })
});