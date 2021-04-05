const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 2000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


app.use('/user', require('./controllers/users.controller'));

app.listen(port, ()=>{
    console.log(`Server is running on: http://localhost:${port}`)
})