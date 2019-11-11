const mongoose = require('mongoose');




let EqSchema = new mongoose.Schema(
  {
    author: String,
    address: String,
    tx: String,
    giturl: String,
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: true
  }
)





module.exports = mongoose.model('Eq', EqSchema)