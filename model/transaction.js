var mongoose = require('mongoose')

var transactionSchema = new mongoose.Schema({
  //data type
  status: {
    type: String,
    default: 'on Market'
  },
  highestBid: {
    type: Number,
    default: 0
  },
  highestBidderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assetOwnerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assetID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset'
  }
})

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
