var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  //data type
  name: String,
  gender: String,
  dob: String,
  profession: String,
  assetLevel: String
})

var User = mongoose.model('User', userSchema)

module.exports = User
