require('dotenv').config()
require('./db.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var sequelize = require('./db.js')


// User.sync()
//*** below deletes the user table when enabled and top disabled.
// User.sync({force:true})
//*** 
sequelize.sync()

app.use(bodyParser.json())
app.use(require('./middleware/headers')) // draws from created node
app.use(require('./middleware/validate-session'))
app.use('/api/user', require('./routes/user'))
app.use('/api/login', require('./routes/session'))
app.use('/api/definition', require('./routes/definition'))
app.use('/api/log', require('./routes/log'))
app.use('/api/test', function(req, res){
  res.send('Hello World')
})

app.listen(process.env.PORT, function(){
  console.log(`app is open on ${process.env.PORT}`)
})
