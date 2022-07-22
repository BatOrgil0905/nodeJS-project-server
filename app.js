const express = require('express');
const bp = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const newsRoutes = require('./routes/news')

app.use(cors())
app.use(bp.json());

app.use(userRoutes)
app.use(newsRoutes)

mongoose.connect("mongodb://localhost:27017/restapi", ()=>{
    app.listen(4001, ()=>{
        console.log('Port is starting on 4001')
    })
})
