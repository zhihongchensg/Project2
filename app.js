var express = require ('express')
var app = express ()

var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var override = require ('method-override')

var flash = require('connect-flash')
var session = require('express-session')

var passport = require('passport')
var MongoStore = require('connect-mongo')(session)

var dotenv = require('dotenv')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise // before connect need to set promise first
// mongoose.connect('mongodb://localhost/personalFinance')

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(layout)
app.use(bodyParser.urlencoded({ // something like this .. the app.use(views) means .. all get requests will render this
  extended: true
}))

app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

require('./config/passport')(passport)
var users_routes = require('./routes/users')
var assets_routes = require('./routes/assets')
var transactions_routes = require('./routes/transactions')

app.use('/', users_routes)
app.use('/assets', assets_routes)
app.use('/transactions', transactions_routes)


app.listen(process.env.PORT || 4000)
console.log('Server running')
