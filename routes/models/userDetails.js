var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userAccountDetailsSchema = new Schema({
    username: String,
    pwd: String,
    loggedIn: Boolean
}, { collection: 'userAccountDetails' });
module.exports = mongoose.model('userAccountDetails', userAccountDetailsSchema);