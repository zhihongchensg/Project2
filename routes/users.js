var express = require('express')
var router = express.Router()
var users = require('../model/user')

router.get('/', function (req, res) {
  users.find ({}, function(err, findAllUsers) {
    if (err) throw new Error (err)
    res.render('./users/allUsers', {
      findAllUsers: findAllUsers
    })
  console.log('am here - ' + findAllUsers)
  })
})

router.get('/add', function (req, res) {
  res.render('users/newUser')
  // res.send('new new user')
})

router.post('/add', function (req, res) {
  users.create(req.body.newuser, function (err, savedUser) {
    console.log('new user created')
    res.redirect('./')
  })
})

router.get('/:id', function (req, res) {
  users.findOne({name: req.params.id}, function (err, findOneUser){
    if (err) throw new Error(err)
    res.render('./users/editUser',{
      findOneUser: findOneUser
    });
  })
})

router.put('/:id', function (req, res) {
  users.update(
    {name: req.body.newuser.name},
    {
      gender: req.body.newuser.gender,
      dob: req.body.newuser.dob,
      profession:req.body.newuser.profession,
      wealthLevel:req.body.newuser.wealthLevel
    },
    function (err, doc) {
      if (err) return handleError(err);
    }
  )
  console.log('am back at put routes')
  console.log(req.body.newuser)
  console.log(req.body.newuser.name)
  res.send('user ' + req.params.id + '\'s account has been updated.')

})

// problems with the delete and put - because the name id is not disabled, can change
// but disabling means it doesnt get returned
// also the entries are all cap sensitive - john and John dont work

router.delete('/:id', function (req, res) {
  console.log(req.body.newuser)
  console.log('at router: ' + req.body.newuser.name)
  users.remove( { name : req.body.newuser.name}, function (err) {
    if (err) return handleError(err);
    // removed!
});
res.send('user ' + req.params.id + '\'s account has been removed.')
})

module.exports = router
