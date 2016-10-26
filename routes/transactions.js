var express = require('express')
var router = express.Router()
var transaction = require('../model/transaction')
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
//
// router.get('/viewPersonSales', function (req, res) {
//   if (! req.isAuthenticated())
//     res.redirect('/login');
//
//     transaction.find({assetOwnerID : req.user._id},
//       function (err, allPersonSales) {
//       res.render('transactions/allPersonSales', {
//         allPersonSales: allPersonSales,
//       })
//     })
// })

router.get('/checkBids', function (req,res){
  if (! req.isAuthenticated())
    res.redirect('/login');

  console.log('at transaction router /')
  transaction.find( {assetOwnerID: req.user._id} )  //, status: "on Market"}
  .populate ('assetOwnerID highestBidderID assetID')
  .exec (function(err, forSaleList) {
    console.log(forSaleList)
    res.render('transactions/bidsList', {
      currentUser: req.user,
      forSaleList: forSaleList
    })
  })
})

router.get('/checkBids/:id', function (req, res) {
  if (! req.isAuthenticated())
    res.redirect('/login');

  transaction.findOne( {_id: req.params.id } )
  .populate ('assetOwnerID highestBidderID assetID')
  .exec (function(err, forSaleList) {
    console.log('the :'+ req.params.id)
    console.log('for sale list here: ')
    console.log(forSaleList.assetID.assetName)
    res.render('transactions/highestBid', {
      currentUser: req.user,
      forSaleList: forSaleList
    })
    // console.log(req.user)
  })
})


router.post('/checkBids/:id', function(req,res){

  transaction.findOne( {_id: req.params.id })
  .populate ('highestBidderID assetID')
  .exec (function(err, bidItem) {
      console.log(bidItem)
      console.log('the params ...' + req.params.id)
      console.log('bidItem.status ' + bidItem.status)
      console.log('bidItem.assetID.Id ' + bidItem.assetID.onMarket)

      transaction.update(
        {_id : req.params.id},
        {
          status: 'Sold'
        },
        function (err, doc) {
          if (err) return handleError(err);
        }
      )
      console.log('bidItem.status -- ' + bidItem.highestBid)
      console.log('bidItem.assetID.Id -- ' + bidItem.assetID.onMarket)

      asset.update(
        {_id : bidItem.assetID._id},
        {
          purchasePrice : bidItem.highestBid,
          sellingPrice: 0,
          onMarket: 'Not for Sale',
          userName: bidItem.highestBidderID._id
        },
        function (err, doc) {
          if (err) return handleError(err);
        }
      )

  })
  res.redirect('/profile')
})



router.get('/', function (req,res){
  if (! req.isAuthenticated())
    res.redirect('/login');

  console.log('at transaction router /')
  transaction.find( {assetOwnerID: { $ne: req.user._id }, status: {$ne: 'sold'}})
  .populate ('assetOwnerID highestBidderID assetID')
  .exec (function(err, forSaleList) {
    console.log(forSaleList)
    res.render('transactions/list', {
      currentUser: req.user,
      forSaleList: forSaleList
    })
  })
})


// router.get('/', function (req,res){
//   console.log('at transaction router /')
//   transaction.find( {assetOwnerID: { $ne: req.user._id } }, function(err, forSaleList) {
//     console.log(forSaleList)
//     res.render('transactions/list', {
//       forSaleList: forSaleList
//     })
//
//   })

// })


router.delete('/delete', function (req, res) {
  console.log('back at transaction remove router')

  transaction.remove( {assetID : req.body.newAsset.assetId}, function (err) {
    if (err) return handleError(err);
    // removed!
  });

  asset.update(
      {_id : req.body.newAsset.assetId},
      {
        onMarket: "Not selling no more"
      },
      function (err, doc) {
        if (err) return handleError(err);
      }
    )

  res.send('done')
})


router.get('/add', function (req, res) {
  if (! req.isAuthenticated())
    res.redirect('/login');

  res.send('whose ur daddy')
})

router.post('/add', function (req, res) {
  console.log('back at router post')
  console.log(req.body.newAsset)

  // if (req.body.newAsset.sellingPrice < 1) {
  //   res.send(500, 'showAlert')
  // }

  asset.update(
      {_id: req.body.newAsset.assetId},
      {
        sellingPrice:req.body.newAsset.sellingPrice,
        onMarket: "For Sale to HIGHEST Bidder"
      },
      function (err, doc) {
        if (err) return handleError(err);
      }
    )

    transaction.findOneAndUpdate(
      {assetID: req.body.newAsset.assetId},
      {$set:
        {
          status: 'on market',
          highestBid: req.body.newAsset.sellingPrice,
          highestBidderID: req.user._id,
          assetOwnerID: req.user._id,
          assetID: req.body.newAsset.assetId,
        }
      },
      {upsert: true},
      function (err, doc) {
        if (err) return handleError(err)
      }

    )

  // transaction.findOne({assetID: req.body.newAsset.assetId}, function (err, transacAvail) {
  //   console.log(transacAvail)
  //
  //   var newTransaction = new transaction({
  //     status: 'on market',
  //     highestBid: req.body.newAsset.sellingPrice,
  //     highestBidderID: req.user._id,
  //     assetID: req.body.newAsset.assetId,
  //   })
  //   console.log('newTransaction created')
  //   console.log(newTransaction)
  //
  //   newTransaction.save(function(err){
  //     if(err) throw new Error(err)
  //   })
  // })
  console.log('new transaction created')
  res.redirect('/profile')
})

// setting the route to homepage
// app.get('/path-name', callback(request, response)) NO
// use router.get instead

// READ ROUTES

// read all movies' details

router.get('/:id', function (req, res) {
  if (! req.isAuthenticated())
    res.redirect('/login');

  transaction.findOne( {_id: req.params.id } )
  .populate ('assetOwnerID highestBidderID assetID')
  .exec (function(err, forSaleList) {
    console.log('the :'+ req.params.id)
    // console.log('for sale list here: ')
    // console.log(forSaleList)
    res.render('transactions/oneTransaction', {
      currentUser: req.user,
      forSaleList: forSaleList
    })
    // console.log(req.user)
  })
})


router.post('/:id', function(req,res){
  var a = Number(req.body.interested.highestBid)
  var b = Number(req.body.interested.yourBid)
  if (a<b){
    transaction.update(
      {_id : req.params.id},
      {
        highestBidderID: req.user._id,
        highestBid:req.body.interested.yourBid
      },
      function (err, doc) {
        if (err) return handleError(err);
        console.log('UPDATE HIGH BID DONE')
      }
    )
  }
  res.redirect('/transactions')
})

  // .populate ('assetOwnerID highestBidderID assetID')
  // .exec (function(err, forSaleList) {
  //   console.log('the :'+ req.params.id)
  //   console.log('for sale list here: ')
  //   console.log(forSaleList)
  // res.render('transactions/oneTransaction', {
  //   currentUser: req.user,
  //   forSaleList: forSaleList
  // })
  // console.log(req.user)
  // })
  // })





// router.post('/:id/edit', function (req, res) {
//   res.send('transactions id edit')
// })
//
// router.put('/:id', function (req, res) {
//   res.send('transactions id put')
// })
//
// router.delete('/:id', function (req, res) {
//   res.send('transactions id delete')
// })

module.exports = router
