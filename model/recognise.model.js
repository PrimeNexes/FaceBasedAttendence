// @ts-check
// userModel.js
var mongoose = require('mongoose');
// Setup schema
var musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    }
});
// Export User model
var Music = module.exports = mongoose.model('Music', musicSchema);

module.exports.get = function (callback) {
    return Music.find(callback);
}