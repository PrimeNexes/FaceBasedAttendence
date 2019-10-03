// @ts-check
// userModel.js
var mongoose = require('mongoose');
// Setup schema
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registed_date: {
        type: Date,
        default: Date.now
    }
});
// Export User model
var User = module.exports = mongoose.model('User', userSchema);

module.exports.get = function (find, limit) {
    return User.find(find).limit(limit);
}