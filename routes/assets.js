var express = require('express')
var router = express.Router()
var asset = require('../model/asset')
var user = require('../model/user')


var passport = require('passport')

function authCheck (req, res, next) {
  // if req.isAuthenticated is false, then let it be

  // if it's true, redirect back to profile

  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in, what are you doing bruh?')
    return res.redirect('/profile')
  } else {
    return next()
  }
}



router.get('/add', function (req, res) {
  if (! req.isAuthenticated())
    res.redirect('/login');

  res.render('./assets/newAsset')
})

router.post('/add', function (req, res) {
  console.log('back at router post')
  user.findOne({email: req.user.email}, function (err, user) {
    console.log(user)

    var newAsset = new asset({
      assetName: req.body.newAsset.assetName,
      purchasePrice: req.body.newAsset.purchasePrice,
      sellingPrice: req.body.newAsset.sellingPrice,
      assetType: req.body.newAsset.assetType,
      userName: req.user._id
    })
    console.log('newAsset created')
    console.log(newAsset)
    console.log(newAsset.userName)

    newAsset.save(function(err){
      if(err) throw new Error(err)
    })
    console.log('new asset created')
    res.redirect('/profile')
  })
})

router.get('/:id', function (req, res) {
  if (! req.isAuthenticated())
    res.redirect('/login');

  console.log('id get id' + req.params.id)
  asset.findOne({_id: req.params.id}, function(err, selectedAsset) {
    console.log(selectedAsset)
    res.render('assets/editAsset', {
      selectedAsset: selectedAsset
    })

  })
})

router.put('/:id', function (req, res) {
  asset.update(
      {_id: req.params.id},
      {
        assetName: req.body.newAsset.assetName,
        purchasePrice: req.body.newAsset.purchasePrice,
        sellingPrice:req.body.newAsset.sellingPrice,
        assetType:req.body.newAsset.assetType,
        onMarket: "Available for Sale"
      },
      function (err, doc) {
        if (err) return handleError(err);
      }
    )
    console.log('am back at put routes')
    console.log(req.body.newAsset)
    console.log(req.body.newAsset.name)
    res.send('user ' + req.params.id + '\'s account has been updated.')

})


router.delete('/:id', function (req, res) {
  console.log('back at delete router')
  console.log(req.body.newAsset)
  console.log('delete router id: ' + req.params.id)

  asset.remove( {_id : req.params.id}, function (err) {
    if (err) return handleError(err);
    // removed!
});
res.send('done')
})

router.delete('/:id', function (req, res) {
  res.send('asset id delete')
})

module.exports = router
