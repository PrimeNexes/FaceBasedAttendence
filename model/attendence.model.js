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
            default: Date.now
        }
});

// Export User model
var Attendence = module.exports = mongoose.model('Attendence', dataSchema);

module.exports.get = async function (find) {
    const give = [];
    const data = await Attendence.find(find).sort({"timestamp":0});
    data.forEach((snapshot)=>{
        give.push(snapshot.toJSON().name);
    })
    return give;//Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
}