const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    cardNumber:Number,
    holderName:String,
    expDate:String,
    cvv:Number,
});

const model = mongoose.model('payment',PaymentSchema);
module.exports = model;