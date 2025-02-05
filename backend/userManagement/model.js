const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SignupSchema = new Schema({
    name:String,
    email:String,
    age:Number,
    password:String,
    role:String
});

const model = mongoose.model('signup',SignupSchema);
module.exports = model; 