var mongoose = require('mongoose')

var assetSchema = new mongoose.Schema({
  //data type
  name: String,
  price: Number,
  assetType: String,
  datePurchase: Date,
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Asset = mongoose.model('Asset', assetSchema)

module.exports = Asset
