var express = require('express')
var router = express.Router()
var asset = require('../model/asset')
var user = require('../model/user')

router.get('/', function (req, res) {
  asset.find ({}, function(err, findAllAssets) {
    if (err) throw new Error (err)
    res.render('./assets/allAsset', {
      findAllAssets: findAllAssets
    })
  console.log('am here at home - ' + findAllAssets)
  })
})

router.get('/add', function (req, res) {
  res.render('./assets/newAsset')
})

router.post('/add', function (req, res) {

  user.findOne({name: req.body.newAsset.name}, function (err, user) {
    console.log(user)

    var newAsset = new asset({
      name: req.body.newAsset.name,
      price: req.body.newAsset.price,
      assetType: req.body.newAsset.assetType,
      datePurchase: req.body.newAsset.datePurchase,
      userName: user.name
    })
    console.log('newAsset created')
    console.log(newAsset)
    console.log(newAsset.userName)

    newAsset.save(function(err){
      if(err) throw new Error(err)
    })
    console.log('new asset created')
    res.redirect('./')
  })
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
