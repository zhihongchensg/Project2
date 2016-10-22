var express = require('express')
var router = express.Router()
var transactions = require('../model/transaction')


// setting the route to homepage
// app.get('/path-name', callback(request, response)) NO
// use router.get instead

// READ ROUTES

// read all movies' details
router.get('/', function (req, res) {
  res.render('./transactions/index')
})

router.get('/add', function (req, res) {
  res.send('transactions add ')
  // res.send('new new user')
})

router.post('/add', function (req, res) {
  res.send('transactions add post')
})

router.get('/:id', function (req, res) {
  res.send('transactions transactions id')
})

router.post('/:id/edit', function (req, res) {
  res.send('transactions id edit')
})

router.put('/:id', function (req, res) {
  res.send('transactions id put')
})

router.delete('/:id', function (req, res) {
  res.send('transactions id delete')
})

module.exports = router
