var express = require('express')
var router = express.Router()
var user = require('../model/user')


router.get('/', function (req, res) {
  user.find({}, function (err, allUsers) {
    res.json(allUsers)
  })
})

router.get('/:id', function (req, res) {
  asset.findOne({_id: req.params.id}, function (err, oneUser) {
    res.json(oneUser)
  })
})

module.exports = router
