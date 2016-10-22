var mongoose = require('mongoose')

var transactionSchema = new mongoose.Schema({
  //data type
  name: String,
  datePurchase: Date,
  onMarket: Boolean,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  assetID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'asset'
  }
})

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
