var mongoose = require('mongoose')

var assetSchema = new mongoose.Schema({
  //data type
  assetName: String,
  purchasePrice: Number,
  sellingPrice: Number,
  assetType: String,
  userName: { //note this is actually userID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Asset = mongoose.model('Asset', assetSchema)

module.exports = Asset
