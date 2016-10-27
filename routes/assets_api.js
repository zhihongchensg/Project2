var express = require('express')
var router = express.Router()
var asset = require('../model/asset')


router.get('/', function (req, res) {
  asset.find({}, function (err, allAssets) {
    res.json(allAssets)
  })
})

router.get('/:id', function (req, res) {
  asset.findOne({_id: req.params.id}, function (err, oneAsset) {
    res.json(oneAsset)
  })
})

module.exports = router
