var express = require ('express')
var app = express ()
var port = 4000

var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise // before connect need to set promise first
mongoose.connect('mongodb://localhost/personalFinance')

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(layout)
app.use(bodyParser.urlencoded({ // something like this .. the app.use(views) means .. all get requests will render this
  extended: true
}))

var users_routes = require('./routes/users')
var assets_routes = require('./routes/assets')
var transactions_routes = require('./routes/transactions')

app.use('/users', users_routes)
app.use('/assets', assets_routes)
app.use('/transactions', transactions_routes)


app.listen(port)
console.log('Server running at http://localhost:' + port + '/')
