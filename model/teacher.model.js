// @ts-check
// userModel.js
var mongoose = require('mongoose');
// Setup schema

var dataSchema = new mongoose.Schema({
    username: {
            type: String,
            required: true
        },
    name: {
            type: String,
            required: true
        },
    subject: {
        type: [String],
        required: true
    },
    registed_date: {
        type: Date,
        default: Date.now
    }});

// Export User model
var Teacher = module.exports = mongoose.model('Teacher', dataSchema);

module.exports.get = async function (find) {
    const data = await Teacher.findOne(find);
    return data;
}