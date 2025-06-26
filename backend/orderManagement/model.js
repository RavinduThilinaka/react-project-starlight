const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    firstName:String,
    lastName:String,
    mobileNumber:Number,
    country:String,
    address:String,
    city:String,
    zipCode:Number
});

const model = mongoose.model('order',OrderSchema);
module.exports = model;