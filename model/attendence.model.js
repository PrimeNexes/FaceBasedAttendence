// @ts-check
var mongoose = require('mongoose');


var dataSchema = new mongoose.Schema({
        subject: {
            type: String,
            required: true
        },
        teacher: {
            type: String,
            required: true
        },
        name: {
            type: [String],
            required: true
        },
        uid: {
            type: [Number],
            required: true
        },
        className: {
            type: String,
            required: true
        },
        attendence: {
            type: [Boolean],
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            default: new Date()
        }
});

// Export User model
var Attendence = module.exports = mongoose.model('Attendence', dataSchema);

module.exports.get = async function (find) {
    const data = await Attendence.find(find).sort({timestamp: 1});
    return data;//Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
}