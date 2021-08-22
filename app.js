const express = require('express')
const app = express()
const mongoose = require('mongoose')
const linkRoute = require('./routes/linkRoute')
const favicon = require('serve-favicon')
const path = require('path')
require('dotenv').config()

app.use(favicon(path.join(__dirname,'assets','favicon (1).ico')))

const db_key = process.env.DB_KEY
const Port = process.env.PORT

mongoose.connect(db_key, { 
    useNewUrlParser: true , 
    useUnifiedTopology: true  
});

let db = mongoose.connection;

db.on('error',() => {console.log('Happened a error.')})
db.once('open', () => {console.log('Data Base loaded')})

mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.use('/', linkRoute)

app.listen(Port, () => console.log(`App runing at PORT:${Port}`))