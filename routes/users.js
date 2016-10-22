var express = require('express')
var router = express.Router()
var users = require('../model/user')


// setting the route to homepage
// app.get('/path-name', callback(request, response)) NO
// use router.get instead

// READ ROUTES

// read all movies' details
router.get('/', function (req, res) {
  res.render('./users/index')
})

router.get('/add', function (req, res) {
  res.send('users add ')
  // res.send('new new user')
})

router.post('/add', function (req, res) {
  res.send('users add post')
})

router.get('/:id', function (req, res) {
  res.send('users users id')
})

router.post('/:id/edit', function (req, res) {
  res.send('users id edit')
})

router.put('/:id', function (req, res) {
  res.send('users id put')
})

router.delete('/:id', function (req, res) {
  res.send('users id delete')
})

module.exports = router
