var mongoose = require('mongoose')

var assetSchema = new mongoose.Schema({
  //data type
  assetName: String,
  purchasePrice: Number,
  assetType: String,
  sellingPrice: { //this is effectively the users listing price
    type: Number,
    default: 0
  },
  onMarket: {
    type: String,
    default: 'Not for Sale'
  },
  userName: { //note this is actually userID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Asset = mongoose.model('Asset', assetSchema)

module.exports = Asset
