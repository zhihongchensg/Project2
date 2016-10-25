var express = require('express')
var router = express.Router()
var User = require('../model/user')
var Asset = require('../model/asset')

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

router.route('/signup')
      .get(authCheck, function (req, res) {
        User.find({}, function (err, allUsers) {
          res.render('users/index-passport', {
            allUsers: allUsers,
            message: req.flash('signupMessage')
          })
        })
      })
      .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
      }))

router.route('/login')
      .get(authCheck, function (req, res) {
        res.render('users/login', { message: req.flash('loginMessage') })
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
      }))

router.get('/error', function (req, res) {
  res.render('users/error')
})

router.get('logout', function(req,res){
  req.logout()
  res.redirect('/')
})

router.get('/profile', function (req, res) {
  if (! req.isAuthenticated())
    res.redirect('/login');
  // if they aren't redirect them to the home page
  // res.redirect('/profile');
  // var currentUser=req.user.local.name
  console.log(req.user._id)
//req.flash('loginMessage')
  Asset.find({userName: req.user._id}, function (err, listAssets) {

    // listAssets.forEach(function(assets) {
    //   console.log(assets.id)
    // })
    //
    // res.send(listAssets)

    res.render('users/profile',
    {
      message: req.user.local.name,
      listAssets: listAssets
    })
  })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})



// ========================== section for edit of users ===============

router.get('/edit', function (req, res) {
  if (! req.isAuthenticated())
    res.redirect('/login');

  console.log(req.user.local)
  res.render('users/editUser', {
  findOneUser: req.user.local
    })
})

router.put('/edit', function (req, res) {
  console.log('at route check: ' + req.user.local.email)
  User.update(
    {'local.email': req.user.local.email},
    {
      'local.gender': req.body.user.gender,
      'local.dob': req.body.user.dob,
      'local.profession':req.body.user.profession,
      'local.marital':req.body.user.marital
    },
    function (err, doc) {
      if (err) return handleError(err);
    }
  )
  console.log('am back at put routes')
  console.log(req.body.user)
  console.log('my user body gender' + req.body.user.gender)
  res.send('done')

})

// =========================================



// ================= this section for authentication, incorporated into my profile page, did not use the functinos=========

function isLoggedIn(req, res, next) {
    // res.send(req.isAuthenticated())
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
function isNotLoggedIn(req, res, next) {
  if (! req.isAuthenticated())
      return next();
  // if they aren't redirect them to the home page
  res.redirect('/profile');
}
// ===============================================








// ============everything after here is not for authentication===============


// router.get('/', function (req, res) {
//   users.find ({}, function(err, findAllUsers) {
//     if (err) throw new Error (err)
//     res.render('./users/allUsers', {
//       findAllUsers: findAllUsers
//     })
//   console.log('am here - ' + findAllUsers)
//   })
// })
//
// router.get('/add', function (req, res) {
//   res.render('users/newUser')
//   // res.send('new new user')
// })
//
// router.post('/add', function (req, res) {
//   users.create(req.body.newuser, function (err, savedUser) {
//     console.log('new user created')
//     res.redirect('./')
//   })
// })
//
// router.get('/:id', function (req, res) {
//   users.findOne({name: req.params.id}, function (err, findOneUser){
//     if (err) throw new Error(err)
//     res.render('./users/editUser',{
//       findOneUser: findOneUser
//     });
//   })
// })
//
// router.put('/:id', function (req, res) {
//   users.update(
//     {name: req.body.newuser.name},
//     {
//       gender: req.body.newuser.gender,
//       dob: req.body.newuser.dob,
//       profession:req.body.newuser.profession,
//       wealthLevel:req.body.newuser.wealthLevel
//     },
//     function (err, doc) {
//       if (err) return handleError(err);
//     }
//   )
//   console.log('am back at put routes')
//   console.log(req.body.newuser)
//   console.log(req.body.newuser.name)
//   res.send('user ' + req.params.id + '\'s account has been updated.')
//
// })
//
// // problems with the delete and put - because the name id is not disabled, can change
// // but disabling means it doesnt get returned
// // also the entries are all cap sensitive - john and John dont work
//
// router.delete('/:id', function (req, res) {
//   console.log(req.body.newuser)
//   console.log('at router: ' + req.body.newuser.name)
//   users.remove( { name : req.body.newuser.name}, function (err) {
//     if (err) return handleError(err);
//     // removed!
// });
// res.send('user ' + req.params.id + '\'s account has been removed.')
// })

module.exports = router
