var express = require('express')
var router = express.Router()
var transaction = require('../model/transaction')


router.get('/', function (req, res) {
  transaction.find({}, function (err, allTransactions) {
    res.json(allTransactions)
  })
})

router.get('/:id', function (req, res) {
  transaction.findOne({_id: req.params.id}, function (err, oneTransaction) {
    res.json(oneTransaction)
  })
})

module.exports = router
