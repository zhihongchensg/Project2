var express = require('express')
var router = express.Router()
var asset = require('../model/asset')


// setting the route to homepage
// app.get('/path-name', callback(request, response)) NO
// use router.get instead

// READ ROUTES

// read all movies' details
router.get('/', function (req, res) {
  res.render('./assets/index')
})

router.get('/add', function (req, res) {
  res.send('asset add ')
  // res.send('new new user')
})

router.post('/add', function (req, res) {
  res.send('asset add post')
})

router.get('/:id', function (req, res) {
  res.send('asset asset id')
})

router.post('/:id/edit', function (req, res) {
  res.send('asset id edit')
})

router.put('/:id', function (req, res) {
  res.send('asset id put')
})

router.delete('/:id', function (req, res) {
  res.send('asset id delete')
})

module.exports = router
